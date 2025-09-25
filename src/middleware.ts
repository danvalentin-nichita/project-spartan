import { auth } from '@/server/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const session = await auth()

  // Not logged in -> Redirect to login
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const isClientRoute = req.nextUrl.pathname.startsWith('/client')
  const isTrainerRoute = req.nextUrl.pathname.startsWith('/trainer')

  if (session?.user.role === 'CLIENT' && !isClientRoute) {
    return NextResponse.redirect(new URL('/client', req.url))
  }
  if (session?.user.role === 'TRAINER' && !isTrainerRoute) {
    return NextResponse.redirect(new URL('/trainer', req.url))
  }

  return NextResponse.next()
}
export const config = {
  matcher: ['/trainer/:path*', '/client/:path*'],
}
