"use client"; // Garante que este é um componente client-side
import React, { useState, useEffect } from 'react';
import styles from './cadastroimpressora.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CadastroImpressora = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [img, setImg] = useState('');
    const [statusI, setStatusI] = useState('true'); // Inicialize com um valor padrão
    const [filamento, setFilamento] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!nome || !descricao || !img || !statusI || !filamento) {
            setErrorMessage('Todos os campos são obrigatórios.');
            return;
        }

        const novaImpressora = {
            nome,
            descricao,
            img,
            statusI: statusI === 'true',
            filamento: parseFloat(filamento)
        };
    
        try {
            const response = await axios.post("http://localhost:5000/impressora", novaImpressora);
            setSuccessMessage('Impressora cadastrada com sucesso!');
            setNome('');
            setDescricao('');
            setImg('');
            setStatusI('true');
            setFilamento('');
            setTimeout(() => {
                setSuccessMessage('');
                router.push("/impressora");
            }, 3000);
        } catch (error) {
            setErrorMessage('Erro ao realizar o cadastro. Tente novamente.');
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <p className={styles.title}>Cadastro de Impressoras</p>
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
                        <label htmlFor="descricao" className={styles.label}>Descrição:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="img" className={styles.label}>Imagem:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="img"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="statusI" className={styles.label}>Status:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="statusI"
                            value={statusI}
                            onChange={(e) => setStatusI(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="filamento" className={styles.label}>Filamento:</label>
                        <input
                            type="number"
                            className={styles.input}
                            id="filamento"
                            value={filamento}
                            onChange={(e) => setFilamento(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`${styles.button} ${styles.submitButton}`}
                    >
                        Cadastrar
                    </button>
                </form>

                {/* Exibição de mensagens de sucesso ou erro */}
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default CadastroImpressora;
