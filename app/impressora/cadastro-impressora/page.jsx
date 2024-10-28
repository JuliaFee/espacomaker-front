"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./cadastroimpressora.module.css";
import Header from "../../components/header/page";
import Footer from "../../components/footer/page";
import axios from "axios";

const CadastroImpressora = () => {
    const [impressora, setImpressora] = useState({
        nome: "",
        descricao: "",
        img: "",
        filamento: "",
    });
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
                    const { nome, descricao, img, filamento } = response.data.impressora || {};
                    setImpressora({ nome, descricao, img, filamento });
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
                await axios.put(`http://localhost:5000/impressora/${editId}`, impressora);
                setSuccessMessage("Impressora atualizada com sucesso!");
            } else {
                const response = await axios.post("http://localhost:5000/impressora", impressora);
                console.log("Resposta do servidor:", response.data); // Log para verificar a resposta do servidor
                setSuccessMessage("Impressora cadastrada com sucesso!");
            }
            setImpressora({ nome: "", descricao: "", img: "", filamento: "" });
            setTimeout(() => {
                setSuccessMessage("");
                router.push("/impressora");
            }, 3000);
        } catch (error) {
            console.error("Erro ao realizar a operação:", error.response.data); // Log detalhado do erro
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
                            value={impressora.nome}
                            onChange={(e) => setImpressora({ ...impressora, nome: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="descricao" className={styles.label}>Descrição:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="descricao"
                            value={impressora.descricao}
                            onChange={(e) => setImpressora({ ...impressora, descricao: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="img" className={styles.label}>Imagem:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="img"
                            value={impressora.img}
                            onChange={(e) => setImpressora({ ...impressora, img: e.target.value })}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="filamento" className={styles.label}>Filamento:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="filamento"
                            value={impressora.filamento}
                            onChange={(e) => setImpressora({ ...impressora, filamento: e.target.value })}
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
