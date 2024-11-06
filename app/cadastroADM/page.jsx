"use client";
import React, { useState } from 'react';
import styles from './cadastroADM.module.css';
import axios from 'axios';
import Header from "../components/header/page";
import Footer from "../components/footer/page";

const CadastroADM = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipo, setTipo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novoUsuario = {
            nome,
            email,
            senha,
            tipo,
        };

        console.log(novoUsuario); 
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, novoUsuario);
            console.log('Usuário cadastrado:', response.data);
            setNome('');
            setEmail('');
            setSenha('');
            setTipo('');
            setErrorMessage(''); 
        } catch (error) {
            if (error.response) {
                console.error('Erro ao cadastrar usuário:', error.response.data);
                setErrorMessage(error.response.data.message || 'Erro desconhecido.');
            } else if (error.request) {
                console.error('Erro na requisição:', error.request);
                setErrorMessage('Erro na requisição. Tente novamente.');
            } else {
                console.error('Erro ao configurar a requisição:', error.message);
                setErrorMessage('Erro ao configurar a requisição.');
            }
        }
    };

    return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <p className={styles.title}>Cadastro de Usuário</p>
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

                    <div className={styles.formGroup}>
                        <label htmlFor="tipo" className={styles.label}>Tipo:</label>
                        <select
                            className={styles.input}
                            id="tipo"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            required
                        >
                            <option value="" disabled>Selecione um tipo</option>
                            <option value="adm">Admin</option>
                            <option value="user">Usuário</option>
                        </select>
                    </div>

                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}

                    <button
                        type="submit"
                        className={`${styles.button} ${styles.submitButton}`}
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default CadastroADM;