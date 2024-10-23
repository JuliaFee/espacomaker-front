"use client";
import React, { useState, useEffect, useRouter } from 'react';
import styles from './cadastroADM.module.css';
import axios from 'axios';


const CadastroForm = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dados, setDados] = useState('');
    const [tipo, setTipo] = useState('');
    const router = useRouter();

        const entrar = async () => {
            router.push(`/loginADM`)
        };
    

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.post("http://localhost:000/users");
                    console.log('Dados recebidos na API:', response.data);
                    setDados(response.data);
                } catch (error) {
                    console.error('Erro ao postar os dados da API:', error);
                }
            };
            fetchData();
        }, []);

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
                const response = await axios.post("http://localhost:5000/users", novoUsuario);
                console.log('Usuário cadastrado:', response.data);
                entrar();
            } catch (error) {
                console.error('Erro ao cadastrar usuário:', error.response ? error.response.data : error.message);
            }
            
        };

        return (
            <div className={styles.pageContainer}>
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
                                <option value="" disabled>Selecione uma opção</option>
                                <option value="aluno">Aluno</option>
                                <option value="docente">Docente</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className={`${styles.button} ${styles.submitButton}`}
                            onClick={entrar}
                        >
                        </button>
                    </form>
                </div>
            </div>
        );
    
};

export default CadastroForm;
