"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
 import styles from "./ferramentas.module.css"; // Import the existing CSS

export default function UpdateFerramenta({ params }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [img, setImg] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    async function fetchFerramentaDetails() {
      try {
        const response = await axios.get(`/api/ferramentas/${id}`);
        const ferramenta = response.data;
        setNome(ferramenta.nome);
        setDescricao(ferramenta.descricao);
        setImg(ferramenta.img);
        setStatus(ferramenta.status);
      } catch (error) {
        console.error("Error fetching ferramenta details:", error);
      }
    }

    if (id) {
      fetchFerramentaDetails();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/ferramentas/${id}`, { nome, descricao, img, status });
      router.push(`/ferramentas/`);
    } catch (error) {
      console.log("Error updating ferramenta:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <Link href={`/ferramentas`}>
          <button className={`${styles.button} ${styles.primaryButton}`}>
            Voltar para Ferramentas
          </button>
        </Link>
      </div>

      <div className={styles.studentsContainer}>
        <h1 className={styles.mainText}>Atualizar Ferramenta</h1>

        {id ? (
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
              <label htmlFor="status" className={styles.label}>
                Status:
              </label>
              <input
                type="text"
                className={styles.input}
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={`${styles.button} ${styles.submitButton}`}
            >
              Atualizar
            </button>
          </form>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
}