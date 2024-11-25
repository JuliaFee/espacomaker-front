"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
import style from "./pageferramentas.module.css"
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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/ferramentas`);
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

  // Toggle status ferramenta
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus; // Alterna o status
      await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/ferramentas/${id}`, {
        statusF: newStatus,
      });

      // Atualiza a lista local de ferramentas
      setFerramentas((prevFerramentas) =>
        prevFerramentas.map((ferramenta) =>
          ferramenta.id === id ? { ...ferramenta, statusF: newStatus } : ferramenta
        )
      );
      setFerramentasFiltradas((prevFerramentasFiltradas) =>
        prevFerramentasFiltradas.map((ferramenta) =>
          ferramenta.id === id ? { ...ferramenta, statusF: newStatus } : ferramenta
        )
      );
    } catch (error) {
      setError("Erro ao alterar o status. Tente novamente.");
    }
  };

  return (
    <div className={style.pageContainer}>
      <Header />
      <div className={style.mainContent}>
        <div className={style.headerList}>
          <Link href="/ferramentas/cadastro-ferramentas" className={style.addFerramentaButton}>
            Adicionar ferramenta
          </Link>
        </div>

        {error && <p className={style.errorMessage}>{error}</p>}

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className={style.ferramentasList}>
            {ferramentasFiltradas.map((ferramenta) => (
              <div key={ferramenta.id} className={style.ferramentaItem}>
                <img src={ferramenta.img} alt={ferramenta.nome} className={style.ferramentaImg} />
                <div className={style.ferramentaDetails}>
                  <p className={style.ferramentaName}>{ferramenta.nome}</p>
                  <p>{ferramenta.descricao}</p>
                  <p>Status: {ferramenta.statusF ? "Disponível" : "Indisponível"}</p>
                </div>
                <div className={style.actions}>
                  <button onClick={() => handleEdit(ferramenta.id)} className={style.editButton}>
                    <FaRegEdit />
                  </button>
                  <button onClick={() => handleDelete(ferramenta.id)} className={style.deleteButton}>
                    <MdOutlineDelete />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(ferramenta.id, ferramenta.statusF)}
                    className={style.toggleStatusButton}
                  >
                    {ferramenta.statusF ? "Tornar Indisponível" : "Tornar Disponível"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Ferramentas;
