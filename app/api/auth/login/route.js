import { NextResponse } from 'next/server'
import { DISCORD_OAUTH_URL } from '@/lib/discord'

export async function GET() {
  return NextResponse.redirect(DISCORD_OAUTH_URL)
}