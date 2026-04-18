import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig as any);
const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  const isAuth = !!req.auth;
  const { pathname } = req.nextUrl;

  // 1. Handle Admin Routes
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login';
    
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
});

export const config = {
  // Match only internationalized pathnames and admin routes
  matcher: [
    // Next-intl matchers
    '/', 
    '/(hi|en|bn)/:path*',
    // Admin matchers
    '/admin/:path*',
    // Exclude static files and API routes (except admin ones)
    '/((?!api|_next|_vercel|images|.*\\..*).*)'
  ]
};
