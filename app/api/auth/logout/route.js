// app/api/auth/logout/route.js
import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json(
        { success: true },
        { status: 200 }
    );

    response.cookies.set({
        name: 'auth_token',
        value: '',
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });

    return response;
}