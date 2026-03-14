import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin and its subroutes
    if (pathname.startsWith('/admin')) {
        const authToken = request.cookies.get('auth_token');

        if (!authToken) {
            // Redirect to login if no token is found
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
