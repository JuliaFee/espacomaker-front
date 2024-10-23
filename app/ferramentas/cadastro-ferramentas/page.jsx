"use client"; // Adiciona esta linha no topo

import React, { useState, useEffect } from 'react';
import styles from './cadastroferramentas.module.css';
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

const CadastroFerramentas = () => {
    const [ferramenta, setFerramenta] = useState({
        nome: '',
        descricao: '',
        img: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('id');

    useEffect(() => {
        if (editId) {
            const fetchFerramenta = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/ferramentas/${editId}`);
                    const { nome, descricao, img } = response.data.ferramenta;
                    setFerramenta({ nome, descricao, img });
                } catch (error) {
                    console.error('Erro ao carregar a ferramenta:', error);
                    setErrorMessage('Erro ao carregar os dados da ferramenta.');
                }
            };
            fetchFerramenta();
        }
    }, [editId]);

    const updateFerramenta = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                await axios.put(`http://localhost:5000/ferramentas/${editId}`, ferramenta);
                setSuccessMessage('Ferramenta atualizada com sucesso!');
            } else {
                await axios.post("http://localhost:5000/ferramentas", ferramenta);
                setSuccessMessage('Ferramenta cadastrada com sucesso!');
            }
            setFerramenta({ nome: '', descricao: '', img: '' });
            setTimeout(() => {
                setSuccessMessage('');
                router.push("/ferramentas");
            }, 3000);
        } catch (error) {
            console.error('Erro ao realizar a operação:', error);
            setErrorMessage('Erro ao realizar a operação. Tente novamente.');
        }
    };

    return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.container}>
                <form onSubmit={updateFerramenta}>
                    <div className={styles.formGroup}>
                        <p className={styles.title}>{editId ? 'Editar Ferramenta' : 'Cadastro de Ferramentas'}</p>
                        <label htmlFor="nome" className={styles.label}>Nome:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="nome"
                            value={ferramenta.nome}
                            onChange={(e) => setFerramenta({ ...ferramenta, nome: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="descricao" className={styles.label}>Descrição:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="descricao"
                            value={ferramenta.descricao}
                            onChange={(e) => setFerramenta({ ...ferramenta, descricao: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="img" className={styles.label}>Imagem:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="img"
                            value={ferramenta.img}
                            onChange={(e) => setFerramenta({ ...ferramenta, img: e.target.value })}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`${styles.button} ${styles.submitButton}`}
                    >
                        {editId ? 'Atualizar' : 'Cadastrar'}
                    </button>
                </form>

                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>

            <Footer />
        </div>
    );
};

export default CadastroFerramentas;