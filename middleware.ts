import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {privateApiBaseURL} from '@/app/config';

export async function middleware(request: NextRequest) {
    if (['/admin', '/editRoute'].some(path => request.nextUrl.pathname.startsWith(path))) {
        const cookie = request.cookies.get('JSESSIONID');

        if (!cookie) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const cookiesValidationUrl = `${privateApiBaseURL}/userDetails`;
        const result = await fetch(cookiesValidationUrl, {
            method: 'GET',
            headers: {
                'Cookie': `JSESSIONID=${cookie.value};`,
            },
        });

        if (result.status !== 200) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    return NextResponse.next();
}