"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./impressora.module.css";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { IoCaretBack } from "react-icons/io5";
import Link from "next/link";
import Loading from "../components/loading/page";

const Impressora = () => {
  const [impressoras, setImpressoras] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Buscar impressoras no backend (aqui ainda vai buscar do backend, mas sem modificar nada no backend)
  useEffect(() => {
    const fetchImpressoras = async () => {
      try {
        const response = await axios.get("/api/impressora");
        if (response.data && Array.isArray(response.data.impressoras)) {
          setImpressoras(response.data.impressoras);
        } else {
          console.error("Dados inesperados:", response.data);
          setError("Formato de dados inesperado!");
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError("Erro interno do servidor!");
      } finally {
        setLoading(false);
      }
    };
    fetchImpressoras();
  }, []);

  // Alterar status de impressora no front-end (somente no estado local)
  const handleToggleStatus = (id) => {
    setImpressoras(impressoras.map((impressora) =>
      impressora.id === id
        ? { ...impressora, statusF: !impressora.statusF }
        : impressora
    ));
  };

  // Excluir impressora
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/impressora/${id}`);
      setImpressoras(impressoras.filter((impressora) => impressora.id !== id));
    } catch (error) {
      setError("Erro ao excluir a impressora, tente novamente.");
    }
  };

  // Editar impressora
  const handleEdit = (id) => {
    router.push(`/impressora/cadastro-impressora?id=${id}`);
  };

  return (
    <div className={style.body}>
      <Header />
      <Link href="../" className={style.back}> <IoCaretBack /> </Link>
      <h1 className={style.h1}>Impressoras Disponíveis</h1>
      {loading ? (
        <div><Loading/></div>
      ) : (
        <>
          {error && <p className={style.error}>{error}</p>}
          <div className={style.container}>
            {impressoras.length > 0 ? (
              impressoras.map((impressora) => (
                <div key={impressora.id} className={style.card}>
                  <img src={impressora.img} alt={impressora.nome} className={style.imagem} />
                  <h2>{impressora.nome}</h2>
                  <p>{impressora.descricao}</p>
                  <p>{impressora.filamento}</p>
                  
                  {/* Exibir status e botão para alterar */}
                  <p
                    className={
                      impressora.statusF
                        ? style.available
                        : style.unavailable
                    }
                  >
                    {impressora.statusF ? "Disponível" : "Indisponível"}
                  </p>
                  <button
                    onClick={() => handleToggleStatus(impressora.id)}
                    className={style.statusButton}
                  >
                    {impressora.statusF
                      ? "Tornar Indisponível"
                      : "Tornar Disponível"}
                  </button>

                  <button onClick={() => handleEdit(impressora.id)} className={style.editButton}>
                    <FaRegEdit />
                  </button>
                  <button onClick={() => handleDelete(impressora.id)} className={style.deleteButton}>
                    <MdOutlineDelete />
                  </button>
                </div>
              ))
            ) : (
              <li>Nenhuma Impressora encontrada.</li>
            )}
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Impressora;
