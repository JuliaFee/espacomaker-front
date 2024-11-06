// app/api/auth/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        const { email, senha } = await request.json();

        // Fazer a validação com sua API existente
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro na autenticação');
        }

        // Assumindo que sua API retorna os dados do usuário
        const user = data.user;

        const apiResponse = NextResponse.json(
            { success: true, user },
            { status: 200 }
        );

        // Definindo o cookie com o token retornado da sua API
        apiResponse.cookies.set({
            name: 'auth_token',
            value: data.token, // Assumindo que sua API retorna um token
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 86400 // 1 dia
        });

        return apiResponse;

    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message || 'Erro na autenticação' },
            { status: 401 }
        );
    }
}

export async function GET() {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('auth_token');

        if (!token) {
            return NextResponse.json(
                { success: false, error: 'Não autenticado' },
                { status: 401 }
            );
        }

        // Validar o token com sua API
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        });

        if (!response.ok) {
            throw new Error('Token inválido');
        }

        const user = await response.json();
        return NextResponse.json({ success: true, user });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Token inválido' },
            { status: 401 }
        );
    }
}