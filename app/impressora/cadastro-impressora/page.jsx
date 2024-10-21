"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./cadastroimpressora.module.css";

export default function CadastroImpressora({ params }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [img, setImg] = useState("");
  const [valor, setValor] = useState("");
  const router = useRouter();
  const { id } = params;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/impressora", { nome, descricao, img, valor });
      setNome("");
      setDescricao("");
      setImg("");
      setValor("");
      router.push(`/impressora`);
    } catch (error) {
      alert("Erro ao criar impressora");
    }
  };

  useEffect(() => {
    async function fetchImpressora() {
      try {
        const response = await axios.get(`/api/impressora/${id}`);
        const impressora = response.data;
        setNome(impressora.nome);
        setDescricao(impressora.descricao);
        setImg(impressora.img);
        setValor(impressora.valor); // Correção aqui
      } catch (error) {
        console.error("Erro ao buscar impressora:", error);
      }
    }
    fetchImpressora();
  }, [id]); // Incluímos o `id` como dependência

  return (
    <div className={styles.container}>
      <div className={styles.action}>
        <Link href="/impressora">
          <button className={`${styles.button} ${styles.primaryButton}`}>
            Voltar para Impressora
          </button>
        </Link>
      </div>
      <div className={styles.cadastroContainer}>
        <h1 className={styles.text}>Cadastrar Impressora</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <label htmlFor="nome" className={styles.label}>
              Nome:
            </label>
            <input
              type="text"
              className={styles.input}
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className={styles.form}>
            <label htmlFor="descricao" className={styles.label}>
              Descrição:
            </label>
            <input
              type="text"
              className={styles.input}
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>
          <div className={styles.form}>
            <label htmlFor="img" className={styles.label}>
              Imagem:
            </label>
            <input
              type="text"
              className={styles.input}
              id="img"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              required
            />
          </div>
          <div className={styles.form}>
            <label htmlFor="valor" className={styles.label}>
              Valor:
            </label>
            <input
              type="text"
              className={styles.input}
              id="valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
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
      </div>
    </div>
  );
}
