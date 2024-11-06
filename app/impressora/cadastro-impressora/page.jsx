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
        statusI: "disponivel"  // Define como disponível por padrão
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("id");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (editId) {
            const fetchImpressora = async () => {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/impressora/${editId}`);
                    const { nome, descricao, img, filamento, statusI } = response.data.impressora;
                    setImpressora({ nome, descricao, img, filamento, statusI });
                } catch (error) {
                    setErrorMessage("Erro ao carregar os dados da impressora");
                }
            };
            fetchImpressora();
        }
    }, [editId]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setImpressora((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleStatusChange = (e) => {
        setImpressora((prev) => ({
            ...prev,
            statusI: e.target.value
        }));
    };

    const updateImpressora = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editId) {
                await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/impressora/${editId}`, impressora);
                setSuccessMessage("Impressora atualizada com sucesso!");
            } else {
                await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/impressora`, impressora);
                setSuccessMessage("Impressora cadastrada com sucesso!");
            }
            setImpressora({ nome: "", descricao: "", img: "", filamento: "", statusI: "disponivel" });
            setTimeout(() => {
                setSuccessMessage("");
                router.push("/impressora");
            }, 3000);
        } catch (error) {
            setErrorMessage("Erro ao realizar a operação. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.container}>
                <form onSubmit={updateImpressora}>
                    <p className={styles.title}>{editId ? "Editar Impressora" : "Cadastro de Impressora"}</p>

                    <div className={styles.formGroup}>
                        <label htmlFor="nome" className={styles.label}>Nome:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="nome"
                            value={impressora.nome}
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroupCheckbox}>
                        <label className={styles.label}>Status:</label>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    className={styles.radio}
                                    name="statusI"
                                    value="disponivel"
                                    checked={impressora.statusI === "disponivel"}
                                    onChange={handleStatusChange}
                                />
                                <span className={styles.statusLabel}>Disponível</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    className={styles.radio}
                                    name="statusI"
                                    value="indisponivel"
                                    checked={impressora.statusI === "indisponivel"}
                                    onChange={handleStatusChange}
                                />
                                <span className={styles.statusLabel}>Indisponível</span>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`${styles.button} ${styles.submitButton}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Salvando..." : editId ? "Atualizar" : "Cadastrar"}
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
