"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./CadastroFerramentas.module.css"; 

export default function CadastroFerramentas({ params }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [img, setImg] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const router = useRouter();
  const { id } = params;

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log("Formulário enviado"); 

    try {
    
      const response = await axios.post("/ferramentas", { nome, descricao, img });

      console.log("Ferramenta criada:", response.data);
      setNome(""); 
      setDescricao("");
      setImg(""); 
      setSuccessMessage("Ferramenta criada com sucesso!"); 
      setErrorMessage(""); 


      setTimeout(() => {
        setSuccessMessage(""); 
        router.push("/ferramentas"); 
      }, 3000); 
    } catch (error) {
      console.error("Erro ao criar ferramenta:", error);
      setErrorMessage("Erro ao criar ferramenta. Tente novamente."); 
      setSuccessMessage(""); 
    }
  };

  useEffect(() => {
    async function fetchFerramentas() {
      if (!id) return; 
      try {
        const response = await axios.get(`/api/ferramentas/${id}`);
        const ferramenta = response.data;
        setNome(ferramenta.nome);
        setDescricao(ferramenta.descricao);
        setImg(ferramenta.img);
      } catch (error) {
        console.error("Error fetching ferramenta details:", error);
      }
    }
    fetchFerramentas();
  }, [id]); 

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <Link href="/ferramentas">
          <button className={styles.button}>Voltar</button>
        </Link>
      </div>

      <div className={styles.ferramentasContainer}>
        <h1 className={styles.mainText}>CADASTRO DE FERRAMENTAS</h1>
      
        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}

        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}

        {/* Formulário de cadastro */}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)} 
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="descricao">Descrição:</label>
            <input
              type="text"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)} 
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="img">Imagem:</label>
            <input
              type="text"
              id="img"
              value={img}
              onChange={(e) => setImg(e.target.value)} 
              required
            />
          </div>
          <div className={styles.formGroup}>
            <button type="submit" className={styles.button}>
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
