"use client";
import React, { useState, useEffect } from 'react';
import styles from './cadastroregistro.module.css';
import axios from 'axios';
import Link from "next/link";
import Header from "../../components/header/page.jsx";
import Footer from "../../components/footer/page.jsx";


const CadastroForm = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dados, setDados] = useState('');

    useEffect (() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:5000/users");
                console.log('Dados recebidos na API:', response.data);
                console.log('Esta funfando tomaaa macetabdo');
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao postar os dados da API:', error);
                console.error('teste', error);
            }
        };
        fetchData();
        
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Crie um objeto com os dados que você deseja enviar
        const novoUsuario = {
            nome,
            email,
            senha,
        };
    
        console.log(novoUsuario); // Para verificar o objeto que será enviado
    
        try {
            // Envie o objeto como o segundo argumento para a requisição POST
            const response = await axios.post("http://localhost:5000/users", novoUsuario);
            console.log('Usuário cadastrado:', response.data);
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    
    };
    

    return (

        <div className={styles.pageContainer}>
            <Header></Header>
            <Link href={"../"}>Ir para home</Link>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <p className={styles.title}>Login</p>
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
                            type="text"
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
                            type="text"
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
                </form>
         
            </div>

            <Footer></Footer>
        </div>
    );
};

export default CadastroForm;