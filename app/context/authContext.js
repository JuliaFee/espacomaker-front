// app/context/AuthContext.js
"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuthState();
    }, []);

    const checkAuthState = async () => {
        try {
            const response = await fetch('/api/auth', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            
            if (data.success) {
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (email, senha) => {
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
                credentials: 'include',
            });

            const data = await response.json();

            if (data.success) {
                setUser(data.user);
                router.push('/home'); // Alterado para sua rota home
                return { success: true };
            } else {
                return {
                    success: false,
                    error: data.error || 'Erro ao fazer login'
                };
            }
        } catch (error) {
            return {
                success: false,
                error: 'Erro ao conectar ao servidor'
            };
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        } finally {
            setUser(null);
            router.push('/login');
        }
    };

    return (
        <AuthContext.Provider 
            value={{
                user,
                loading,
                login: handleLogin,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};