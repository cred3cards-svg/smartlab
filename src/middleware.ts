import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextResponse, NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Handle Admin Routes with Lightweight Cookie Check
  // This bypasses the heavy NextAuth runtime in the Edge environment
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login';
    
    // Check for NextAuth session cookie
    // In production (HTTPS), it's usually prefixed with __Secure-
    const sessionToken = req.cookies.get('__Secure-next-auth.session-token') || 
                        req.cookies.get('next-auth.session-token');
    
    const isAuth = !!sessionToken;
    
    if (!isAuth && !isLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    
    if (isAuth && isLoginPage) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    return NextResponse.next();
  }

  // 2. Handle Public Multilingual Routes
  return intlMiddleware(req);
}

export const config = {
  // Match only internationalized pathnames and admin routes
  matcher: [
    '/', 
    '/(hi|en|bn)/:path*',
    '/admin/:path*',
    '/((?!api|_next|_vercel|images|.*\\..*).*)'
  ]
};
