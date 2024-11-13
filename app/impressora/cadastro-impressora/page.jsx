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
        filamento: {
            tipo: "",
            cor: "",
            quantidade: 0,
            valor_por_kg: 0
        },
        statusI: "disponivel"
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
                    setImpressora({ nome, descricao, img, filamento: filamento || {}, statusI });
                } catch (error) {
                    setErrorMessage("Erro ao carregar os dados da impressora");
                }
            };
            fetchImpressora();
        }
    }, [editId]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id.startsWith("filamento.")) {
            const filamentoField = id.split(".")[1];
            setImpressora((prev) => ({
                ...prev,
                filamento: { ...prev.filamento, [filamentoField]: value }
            }));
        } else {
            setImpressora((prev) => ({
                ...prev,
                [id]: value
            }));
        }
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
        setErrorMessage("");

        try {
            if (editId) {
                await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/impressora/${editId}`, impressora);
                setSuccessMessage("Impressora atualizada com sucesso!");
            } else {
                await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/impressora`, impressora);
                setSuccessMessage("Impressora cadastrada com sucesso!");
            }

            setImpressora({
                nome: "",
                descricao: "",
                img: "",
                filamento: { tipo: "", cor: "", quantidade: 0, valor_por_kg: 0 },
                statusI: "disponivel"
            });

            setTimeout(() => {
                setSuccessMessage("");
                router.push("/impressora");
            }, 3000);

        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Erro ao realizar a operação. Verifique sua conexão.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.container}>
                <form onSubmit={updateImpressora}>
                    <div className={styles.form}>
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

                        <p className={`${styles.label} ${styles.centered}`}>Filamento</p>
                        <div className={styles.formGroup}>
                            <label htmlFor="filamento.tipo" className={styles.label}>Tipo:</label>
                            <input
                                type="text"
                                className={styles.input}
                                id="filamento.tipo"
                                value={impressora.filamento.tipo || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="filamento.cor" className={styles.label}>Cor:</label>
                            <input
                                type="text"
                                className={styles.input}
                                id="filamento.cor"
                                value={impressora.filamento.cor || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="filamento.quantidade" className={styles.label}>Quantidade:</label>
                            <input
                                type="number"
                                className={styles.input}
                                id="filamento.quantidade"
                                value={impressora.filamento.quantidade || 0}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="filamento.valor_por_kg" className={styles.label}>Valor por Kg:</label>
                            <input
                                type="number"
                                className={styles.input}
                                id="filamento.valor_por_kg"
                                value={impressora.filamento.valor_por_kg || 0}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Status:</label>
                            <div className={styles.radioContainer}>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        className={styles.radio}
                                        name="statusI"
                                        value="disponivel"
                                        checked={impressora.statusI === "disponivel"}
                                        onChange={handleStatusChange}
                                    />
                                    Disponível
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        className={styles.radio}
                                        name="statusI"
                                        value="indisponivel"
                                        checked={impressora.statusI === "indisponivel"}
                                        onChange={handleStatusChange}
                                    />
                                    Indisponível
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
                    </div>
                </form>
                
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
            <Footer />
        </div>
    );
};

export default CadastroImpressora;
