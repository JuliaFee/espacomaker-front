"use client";
import React, { useState } from 'react';
import styles from './login.module.css';
import axios from 'axios';
import Header from "./../components/header/page";
import Footer from "./../components/footer/page";
import { useRouter } from 'next/router';
import { Link } from '@react-navigation/native';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [usuario, setUsuario] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const trimmedEmail = email.trim();
        const trimmedSenha = senha.trim();
        
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email: trimmedEmail,
                senha: trimmedSenha,
            });
    
            const { tipo } = response.data; // Assumindo que o backend retorna o tipo de usuário
            setUsuario(response.data);
            localStorage.setItem("tipoUsuario", tipo); // Salvando o tipo de usuário no localStorage
            
            router.push('/app'); 
            
        } catch (error) {
            setMensagem(error.response ? error.response.data.message : 'Erro ao tentar logar. Tente novamente.');
        }
    };
    

    return (
        <div className={styles.pageContainer}>
            <Header/>
            <Link href={"../"} className={styles.back}>Ir para home</Link>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <p className={styles.title}>Login de usuário</p>

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

                    {mensagem && <p className={styles.message}>{mensagem}</p>}
                </form>

                {usuario && (
                    <div className={styles.profile}>
                        <h2>Perfil do Usuário</h2>
                        <p><strong>Nome:</strong> {usuario.nome}</p>
                        <p><strong>Email:</strong> {usuario.email}</p>
                        <p><strong>Tipo:</strong> {usuario.tipo === 'adm' ? 'Admin' : 'Usuário'}</p>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default LoginForm;
