import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  const geo = request.geo

  // Use real data if available, otherwise use mock data
  response.headers.set('x-vercel-ip-country', geo?.country ?? 'MockCountry')
  response.headers.set('x-vercel-ip-city', geo?.city ?? 'MockCity')
  response.headers.set('x-vercel-ip-latitude', geo?.latitude ?? '40.7128')
  response.headers.set('x-vercel-ip-longitude', geo?.longitude ?? '-74.0060')

  return response
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}