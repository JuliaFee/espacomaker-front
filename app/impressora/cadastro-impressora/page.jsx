"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./cadastroimpressora.module.css";
import Header from "../../components/header/page";
import Footer from "../../components/footer/page";
import axios from "axios";

const CadastroImpressora = () => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [img, setImg] = useState("");
    const [filamento, setFilamento] = useState("");
    const [statusI, setStatusI] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("id");

    useEffect(() => {
        if (editId) {
            const fetchImpressora = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/impressora/${editId}`);
                    console.log("Dados recebidos:", response.data);
                    const { nome, descricao, img, filamento, statusI } = response.data.impressora || {};
                    setNome(nome || "");
                    setDescricao(descricao || "");
                    setImg(img || "");
                    setFilamento(filamento || "");
                    setStatusI(statusI || "");
                } catch (error) {
                    console.error("Erro ao carregar a impressora:", error);
                    setErrorMessage("Erro ao carregar os dados da impressora");
                }
            };
            fetchImpressora();
        }
    }, [editId]);

    const updateImpressora = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`http://localhost:5000/impressora/${editId}`, { nome, descricao, img, filamento, statusI });
                setSuccessMessage("Impressora atualizada com sucesso!");
            } else {
                const response = await axios.post("http://localhost:5000/impressora", { nome, descricao, img, filamento, statusI });
                console.log("Resposta do servidor:", response.data);
                setSuccessMessage("Impressora cadastrada com sucesso!");
            }
            setNome("");
            setDescricao("");
            setImg("");
            setFilamento("");
            setStatusI("");
            setTimeout(() => {
                setSuccessMessage("");
                router.push("/impressora");
            }, 3000);
        } catch (error) {
            console.error("Erro ao realizar a operação:", error);
            setErrorMessage("Erro ao realizar a operação. Tente novamente.");
        }
    };

    return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.container}>
                <form onSubmit={updateImpressora}>
                    <div className={styles.formGroup}>
                        <p className={styles.title}>{editId ? "Editar Impressora" : "Cadastro de Impressora"}</p>
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
                        <label htmlFor="filamento" className={styles.label}>Filamento:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="filamento"
                            value={filamento}
                            onChange={(e) => setFilamento(e.target.value)}
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

                    <button
                        type="submit"
                        className={`${styles.button} ${styles.submitButton}`}
                    >
                        {editId ? "Atualizar" : "Cadastrar"}
                    </button>
                </form>
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
            <Footer />
        </div>
    );
};

export default CadastroImpressora;
