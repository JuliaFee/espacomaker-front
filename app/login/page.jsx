"use client";
import React, { useState, useEffect } from 'react';
import styles from './login.module.css';
import { useRouter } from 'next/navigation';
import Header from "../components/header/page.jsx";
import Footer from "../components/footer/page.jsx";
import { useAuth } from '../context/authContext';
import Loading from '../components/loading/page';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (!email || !senha) {
                throw new Error('Por favor, preencha todos os campos');
            }

            const result = await login(email, senha);
            
            if (!result.success) {
                setError(result.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <p className={styles.title}>Login</p>
                        {error && <p className={styles.error}>{error}</p>}
                        
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.title2}>Email:</label>
                            <input
                                type="email"
                                className={styles.input}
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="senha" className={styles.title2}>Senha:</label>
                            <input
                                type="password"
                                className={styles.input}
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <button
                            type="submit"
                            className={`${styles.button} ${styles.submitButton}`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Carregando..." : 'Entrar'}
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default LoginForm;