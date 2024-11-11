import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email, senha } = await request.json();

        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth`, {
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

      
        return NextResponse.json({
            success: true,
            user: data.user,
            token: data.token
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message || 'Erro na autenticação' },
            { status: 401 }
        );
    }
}

export async function GET(request) {
    try {
    
        const authorization = request.headers.get('authorization');
        
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new Error('Token não fornecido');
        }

        const token = authorization.split(' ')[1];

      
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Token inválido');
        }

        const userData = await response.json();
        return NextResponse.json({ success: true, user: userData });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message || 'Não autorizado' },
            { status: 401 }
        );
    }
}