import { NextResponse } from 'next/server'
import { getOAuthURL } from '../discord'

export async function GET() {
  return NextResponse.redirect(getOAuthURL())
}
