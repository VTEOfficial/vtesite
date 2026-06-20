import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAvatarUrl } from '@/lib/discord'

export async function GET() {
  const cookieStore = await cookies()
  const raw = cookieStore.get('vertex.session')?.value

  if (!raw) {
    return NextResponse.json({ user: null })
  }

  try {
    const session = JSON.parse(raw)
    return NextResponse.json({
      user: {
        id: session.id,
        username: session.username,
        global_name: session.global_name,
        discriminator: session.discriminator,
        avatar_url: getAvatarUrl(session),
      },
    })
  } catch {
    return NextResponse.json({ user: null })
  }
}