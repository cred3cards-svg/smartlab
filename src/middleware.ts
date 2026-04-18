import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: any) {
  const { pathname } = req.nextUrl;

  // Manual check for admin routes to avoid next-auth bloat in middleware if possible
  if (pathname.startsWith('/admin')) {
    // For now, just allow next() to see if it even boots
    // We can add auth back once we confirm this works
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    '/', 
    '/(hi|en|bn)/:path*',
    '/admin/:path*',
    '/((?!api|_next|_vercel|images|.*\\..*).*)'
  ]
};
