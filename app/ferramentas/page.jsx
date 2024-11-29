"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
import styles from "./pageferramentas.module.css";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

const Ferramentas = () => {
  const [ferramentas, setFerramentas] = useState([]);
  const [ferramentasFiltradas, setFerramentasFiltradas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Buscar ferramentas no backend
  useEffect(() => {
    const fetchFerramentas = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/ferramentas`
        );

        if (response.data && Array.isArray(response.data.ferramentas)) {
          const ferramentasComStatus = response.data.ferramentas.map((ferramenta) => ({
            ...ferramenta,
            statusF: true, // Inicializa todas as ferramentas como "Disponível"
          }));
          setFerramentas(ferramentasComStatus);
          setFerramentasFiltradas(ferramentasComStatus);
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

  // Alterar status no front-end
  const handleToggleStatus = (id) => {
    setFerramentas((prevFerramentas) =>
      prevFerramentas.map((ferramenta) =>
        ferramenta.id === id
          ? { ...ferramenta, statusF: !ferramenta.statusF }
          : ferramenta
      )
    );

    setFerramentasFiltradas((prevFerramentasFiltradas) =>
      prevFerramentasFiltradas.map((ferramenta) =>
        ferramenta.id === id
          ? { ...ferramenta, statusF: !ferramenta.statusF }
          : ferramenta
      )
    );
  };

  // Excluir ferramenta
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/ferramentas/${id}`);
      setFerramentas((prev) => prev.filter((ferramenta) => ferramenta.id !== id));
      setFerramentasFiltradas((prev) =>
        prev.filter((ferramenta) => ferramenta.id !== id)
      );
    } catch (error) {
      setError("Erro ao excluir a ferramenta. Tente novamente.");
    }
  };

  // Editar ferramenta
  const handleEdit = (id) => {
    router.push(`/ferramentas/cadastro-ferramentas?id=${id}`);
  };

  // Filtrar ferramentas
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filteredTools = ferramentas.filter((ferramenta) =>
      ferramenta.nome.toLowerCase().includes(searchValue)
    );
    setFerramentasFiltradas(filteredTools);
  };

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
              ferramentasFiltradas.map((ferramenta) => (
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
                      ferramenta.statusF
                        ? styles.available
                        : styles.unavailable
                    }
                  > 
                    {ferramenta.statusF ? "Disponível" : "Indisponível"}
                  </p>
                  <button
                    onClick={() => handleToggleStatus(ferramenta.id)}
                    className={styles.statusButton}
                  >
                    {ferramenta.statusF
                      ? "Tornar Indisponível"
                      : "Tornar Disponível"}
                  </button>
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
              ))
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
