"use client";
import React, { useState } from 'react';
import styles from './cadastroferramentas.module.css';
import Header from "../../components/header/page";
import Footer from "../../components/footer/page";


const FerramentasForm = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [img, setImg] = useState('');
    // const [statusF, setStatusF] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Lógica para enviar os dados para o backend
        const novaFerramenta = {
            nome,
            descricao,
            img,
            //statusF
        };

        console.log('Ferramenta cadastrada:', novaFerramenta);
        // requisição para o backend 
    };

    return (

        <div className={styles.pageContainer}>
            <Header></Header>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <p className={styles.title}>Registrar ferramentas</p>
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
                        <label htmlFor="img" className={styles.label}>Imagem (URL):</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="img"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                        />
                    </div>

                    {/* <div className={styles.formGroup}>
          <label htmlFor="statusF">Status:</label>
          <input
            type="checkbox"
            className={styles.inputCheckbox}
            id="statusF"
            checked={statusF}
            onChange={(e) => setStatusF(e.target.checked)}
          />
        </div> */}

                    <button
                        type="submit"
                        className={`${styles.button} ${styles.submitButton}`}
                    >
                        Cadastrar
                    </button>
                </form>
                {/*  pop-up de sucesso ou erro */}
            </div>

            <Footer></Footer>
        </div>
    );
};

export default FerramentasForm;