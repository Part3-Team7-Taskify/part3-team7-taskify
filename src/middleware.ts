import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const token = request.cookies.has('accessToken');

  if (
    (token && request.nextUrl.pathname.startsWith('/login')) ||
    (token && request.nextUrl.pathname.startsWith('/signup'))
  ) {
    return NextResponse.redirect(new URL('/mydashboard', request.url));
  }
  if (
    (!token && request.nextUrl.pathname.startsWith('/dashboard')) ||
    (!token && request.nextUrl.pathname.startsWith('/mydashboard'))
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [`/((?!api|_next/static|_next/image|favicon.ico).*)`],
};
