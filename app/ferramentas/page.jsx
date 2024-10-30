"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
import styles from "./pageferramentas.module.css";
import { MdOutlineDelete } from "react-icons/md";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const Ferramentas = () => {
  const [ferramentas, setFerramentas] = useState([]);
  const [deviceType, setDeviceType] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tipoUsuario, setTipoUsuario] = useState(""); // Adiciona o tipo de usuário
  const router = useRouter();

  const getDeviceType = () => {
    const userAgent = navigator.userAgent;
    return /android/i.test(userAgent) || (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) ? "Mobile" : "Desktop";
  };

  useEffect(() => {
    const tipo = localStorage.getItem("tipoUsuario");
    setTipoUsuario(tipo); // Define o tipo de usuário
  }, []);

  useEffect(() => {
    const deviceType = getDeviceType();
    document.body.classList.add(deviceType);
    setDeviceType(deviceType);
    return () => {
      document.body.classList.remove(deviceType);
    };
  }, []);

  useEffect(() => {
    const fetchFerramentas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/ferramentas");
        if (response.data && Array.isArray(response.data.ferramentas)) {
          setFerramentas(response.data.ferramentas);
        } else {
          setError("Formato de dados inesperado!");
        }
      } catch (error) {
        setError("Erro interno do servidor!");
      } finally {
        setLoading(false);
      }
    };
    fetchFerramentas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/ferramentas/${id}`);
      setFerramentas(ferramentas.filter((ferramenta) => ferramenta.id !== id));
    } catch (error) {
      setError("Erro ao excluir a ferramenta. Tente novamente.");
    }
  };

  const handleEdit = (id) => {
    router.push(`/ferramentas/cadastro-ferramentas?id=${id}`);
  };

  return (
    <div className={styles.body}>
      <Header />
      <Link href={"../"} className={styles.back}>Ir para home</Link>
      <h1 className={styles.h1}>Ferramentas Disponíveis</h1>
      <h3 className={styles.h3}>Tipo de dispositivo: {deviceType}</h3>
      {loading ? (
        <p className={styles.loading}>Carregando...</p>
      ) : (
        <>
          {error && <p className={styles.error}>{error}</p>}
          <ul className={styles.container}>
            {ferramentas.length > 0 ? (
              ferramentas.map((ferramenta) => (
                <li key={ferramenta.id} className={styles.card}>
                  <img src={ferramenta.img} alt={ferramenta.nome} className={styles.imagem} />
                  <h2 className={styles.title}>{ferramenta.nome}</h2>
                  <p>{ferramenta.descricao}</p>
                  
                  {/* Botões condicionais com base no tipo de usuário */}
                  {tipoUsuario === "adm" && (
                    <>
                      <button onClick={() => handleEdit(ferramenta.id)} className={styles.editButton}>
                        <FaRegEdit />
                      </button>
                      <button onClick={() => handleDelete(ferramenta.id)} className={styles.deleteButton}>
                        <MdOutlineDelete />
                      </button>
                    </>
                  )}
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
