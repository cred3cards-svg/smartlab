import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";
import { NextResponse } from 'next/server';

// Initialize NextAuth with the lightweight config
const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  const isAuth = !!req.auth;
  const { pathname } = req.nextUrl;

  // 1. Handle Admin Route Protection
  // NextAuth 'auth' wrapper handles session cookie verification automatically
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

  // 2. Handle Multilingual Routes for all other pages
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    '/', 
    '/(hi|en|bn)/:path*',
    '/admin/:path*',
    '/((?!api|_next|_vercel|images|.*\\..*).*)'
  ]
};
