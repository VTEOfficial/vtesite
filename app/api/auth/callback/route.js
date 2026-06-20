import { NextResponse } from 'next/server'
import { exchangeCode, fetchDiscordUser } from '../discord'
import { cookies } from 'next/headers'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error || !code) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    const tokens = await exchangeCode(code)
    const user = await fetchDiscordUser(tokens.access_token)

    const session = {
      id: user.id,
      username: user.username,
      global_name: user.global_name,
      discriminator: user.discriminator,
      avatar: user.avatar,
      access_token: tokens.access_token,
    }

    const cookieStore = await cookies()
    cookieStore.set('vertex.session', JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return NextResponse.redirect(new URL('/', request.url))
  } catch {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
