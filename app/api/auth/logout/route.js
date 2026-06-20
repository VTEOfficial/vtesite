import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request) {
  const cookieStore = await cookies()
  cookieStore.delete('vertex.session')
  return NextResponse.redirect(new URL('/', request.url))
}