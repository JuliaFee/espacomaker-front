"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
import styles from "./pageferramentas.module.css";
import { IoCaretBack } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Ferramentas = () => {
  const [ferramentas, setFerramentas] = useState([]);
  const [ferramentasFiltradas, setFerramentasFiltradas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch ferramentas
  useEffect(() => {
    const fetchFerramentas = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/ferramentas`
        );

        console.log("Dados recebidos do backend:", response.data); // Log para verificar dados recebidos

        if (response.data && Array.isArray(response.data.ferramentas)) {
          setFerramentas(response.data.ferramentas);
          setFerramentasFiltradas(response.data.ferramentas);
        } else {
          setError("Formato de dados inesperado!");
        }
      } catch (error) {
        setError("Erro ao carregar os dados. Verifique o backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchFerramentas();
  }, []);

  // Delete ferramenta
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/ferramentas/${id}`);
      setFerramentas(ferramentas.filter((ferramenta) => ferramenta.id !== id));
      setFerramentasFiltradas(ferramentasFiltradas.filter((ferramenta) => ferramenta.id !== id));
    } catch (error) {
      setError("Erro ao excluir a ferramenta. Tente novamente.");
    }
  };

  // Edit ferramenta
  const handleEdit = (id) => {
    router.push(`/ferramentas/cadastro-ferramentas?id=${id}`);
  };

  // Filter ferramentas
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filteredTools = ferramentas.filter((ferramenta) =>
      ferramenta.nome.toLowerCase().includes(searchValue)
    );
    setFerramentasFiltradas(filteredTools);
  };

  // Render
  return (
    <div className={styles.body}>
      <Header />
      
      <h1 className={styles.h1}>Ferramentas Disponíveis</h1>

      <div className={styles.search}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Busque aqui..."
          className={styles.searchInput}
        />
      </div>

      {loading ? (
        <p className={styles.loading}>Carregando...</p>
      ) : (
        <>
          {error && <p className={styles.error}>{error}</p>}
          <ul className={styles.container}>
            {ferramentasFiltradas.length > 0 ? (
              ferramentasFiltradas.map((ferramenta) => {
                return (
                  <li key={ferramenta.id} className={styles.card}>
                    <img
                      src={ferramenta.img}
                      alt={ferramenta.nome}
                      className={styles.imagem}
                    />
                    <h2 className={styles.subtitle}>{ferramenta.nome}</h2>
                    <p>{ferramenta.descricao}</p>
                    <p
                      className={
                        ferramenta.statusF ? styles.available : styles.unavailable
                      }
                    >
                      <p className={styles.status}>
                        {ferramenta.statusF ? "Disponível" : "Indisponível"}
                      </p>
                    </p>
                    <button
                      onClick={() => handleEdit(ferramenta.id)}
                      className={styles.editButton}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(ferramenta.id)}
                      className={styles.deleteButton}
                    >
                      <MdOutlineDelete />
                    </button>
                  </li>
                );
              })
            ) : (
              <li>Nenhuma ferramenta encontrada.</li>
            )}
          </ul>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Ferramentas;
