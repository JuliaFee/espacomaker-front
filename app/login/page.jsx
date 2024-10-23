"use client";
import React, { useState } from 'react';
import styles from './login.module.css';
import axios from 'axios';

const LoginForm = () => {
    const [nome, setNome] = useState(''); // Adicionando estado para o nome
    const [email, setEmail] = useState(''); // Adicionando estado para o email
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Envia nome, email e senha para o backend via GET
            const response = await axios.get('http://localhost:5000/users/login', {
                params: {
                    nome: nome,
                    email: email,
                    senha: senha,
                },
            });

            // Verifica a resposta do backend
            if (response.data.success) {
                setMensagem('Login realizado com sucesso!');
                // Aqui você pode redirecionar o usuário ou realizar outras ações
            } else {
                setMensagem(response.data.message); // Mensagem de erro do backend
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            setMensagem('Erro ao tentar logar. Tente novamente.');
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <p className={styles.title}>Login de usuário</p>

                        <div className={styles.formGroup}>
                            <label htmlFor="nome" className={styles.label}>Nome:</label>
                            <input
                                type="text"
                                className={styles.input}
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>

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

                    {/* Exibe a mensagem de sucesso ou erro */}
                    {mensagem && <p className={styles.message}>{mensagem}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
