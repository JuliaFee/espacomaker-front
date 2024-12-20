"use client"; 

import React, { useState, useEffect } from 'react';
import styles from './cadastroferramentas.module.css';
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import PopUp from "@/app/components/popUp/PopUp";
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

const CadastroFerramentas = () => {
    const [ferramenta, setFerramenta] = useState({
        nome: '',
        descricao: '',
        img: '',
        statusF: true, // 'true' significa disponível
    });
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupTypeColor, setPopupTypeColor] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('id');

    // Carregar dados da ferramenta para edição
    useEffect(() => {
        if (editId) {
            const fetchFerramenta = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/ferramentas/${editId}`);
                    const { nome, descricao, img } = response.data.ferramenta; // Status ignorado
                    setFerramenta({ nome, descricao, img, statusF: true });
                } catch (error) {
                    console.error('Erro ao carregar os dados da ferramenta:', error.response?.data || error.message);
                    setPopupMessage('Erro ao carregar os dados da ferramenta.');
                    setPopupTypeColor('erro');
                    setIsPopupOpen(true);
                }
            };
            fetchFerramenta();
        }
    }, [editId]);

    // Alternar status no front-end
    const handleStatusChange = () => {
        setFerramenta((prev) => ({
            ...prev,
            statusF: !prev.statusF,
        }));
    };

    const statusTexto = ferramenta.statusF ? "Disponível" : "Indisponível";

    const updateFerramenta = async (e) => {
        e.preventDefault();

        try {
            const data = { ...ferramenta };

            if (editId) {
                await axios.put(`http://localhost:5000/ferramentas/${editId}`, data);
                setPopupMessage('Ferramenta atualizada com sucesso!');
                setPopupTypeColor('sucesso');
            } else {
                await axios.post("http://localhost:5000/ferramentas", data);
                setPopupMessage('Ferramenta cadastrada com sucesso!');
                setPopupTypeColor('sucesso');
            }

            setFerramenta({ nome: '', descricao: '', img: '', statusF: true });
            setIsPopupOpen(true);

            setTimeout(() => {
                setIsPopupOpen(false);
                router.push("/ferramentas");
            }, 3000);
        } catch (error) {
            console.error('Erro ao realizar a operação:', error.response?.data || error.message);
            setPopupMessage('Erro ao realizar a operação. Tente novamente.');
            setPopupTypeColor('erro');
            setIsPopupOpen(true);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.mainContent}>
                <div className={styles.formOverlay}>
                    <form onSubmit={updateFerramenta} className={styles.formContainer}>
                        <p className={styles.title}>{editId ? 'Editar Ferramenta' : 'Cadastro de Ferramentas'}</p>
                        <div className={styles.formGroup}>
                            <label htmlFor="nome" className={styles.label}>Nome:</label>
                            <input
                                type="text"
                                className={`${styles.input} ${styles.inputText}`}
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
                                className={`${styles.input} ${styles.inputText}`}
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
                                className={`${styles.input} ${styles.inputText}`}
                                id="img"
                                value={ferramenta.img}
                                onChange={(e) => setFerramenta({ ...ferramenta, img: e.target.value })}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Status:</label>
                            <p>Status atual: <strong>{statusTexto}</strong></p>
                            <button
                                type="button"
                                onClick={handleStatusChange}
                                className={`${styles.button} ${styles.statusButton}`}
                            >
                                {ferramenta.statusF ? 'Tornar Indisponível' : 'Tornar Disponível'}
                            </button>
                        </div>
                        <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
                            {editId ? 'Atualizar' : 'Cadastrar'}
                        </button>
                    </form>
                </div>
                {isPopupOpen && <PopUp message={popupMessage} typeColor={popupTypeColor} onClose={() => setIsPopupOpen(false)} />}
            </div>
            <Footer />
        </div>
    );
};

export default CadastroFerramentas;
