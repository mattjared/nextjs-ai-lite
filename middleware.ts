import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  const geo = request.geo

  response.headers.set('x-vercel-ip-country', geo?.country ?? 'Unknown')
  response.headers.set('x-vercel-ip-city', geo?.city ?? 'Unknown')
  response.headers.set('x-vercel-ip-latitude', geo?.latitude ?? 'Unknown')
  response.headers.set('x-vercel-ip-longitude', geo?.longitude ?? 'Unknown')

  return response
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}