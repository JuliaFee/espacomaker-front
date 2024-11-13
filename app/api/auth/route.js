import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email, senha } = await request.json();

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro na autenticação');
        }

        const data = await response.json();
       
        // Ensure we're returning a JSON response
        return NextResponse.json(
            { success: true, user: data.user, token: data.token },
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

    } catch (error) {
        console.error('Erro no POST:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Erro na autenticação' },
            {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
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

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/id`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Token inválido');
        }

        const userData = await response.json();
       
        // Ensure we're returning a JSON response
        return NextResponse.json(
            { success: true, user: userData },
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

    } catch (error) {
        console.error('Erro no GET:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Não autorizado' },
            {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }
}