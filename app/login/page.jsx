// app/login/page.jsx
"use client";
import React, { useState } from 'react';
import styles from './login.module.css';
import Link from "next/link";
import Header from "../components/header/page.jsx";
import Footer from "../components/footer/page.jsx";
import { useAuth } from '../context/authContext.js';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        const result = await login(email, senha);
        
        if (!result.success) {
            setError(result.error);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <Header />
            <Link href={"../"} className={styles.back}>Ir para home</Link>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <p className={styles.title}>Login</p>
                        {error && <p className={styles.error}>{error}</p>}
                        
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Email:</label>
                            <input
                                type="email"
                                className={styles.input}
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="senha" className={styles.label}>Senha:</label>
                            <input
                                type="password"
                                className={styles.input}
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`${styles.button} ${styles.submitButton}`}
                        >
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default LoginForm;