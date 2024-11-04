"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
import style from "./pageferramentas.module.css";
import { IoCaretBack } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from 'next/navigation'; // Adicionando o hook para redirecionar
import Link from "next/link";

const Ferramentas = () => {
  const [ferramentas, setFerramentas] = useState([]);
  const [deviceType, setDeviceType] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Para redirecionar o usuário

  const getDeviceType = () => {
    const userAgent = navigator.userAgent;
    return /android/i.test(userAgent) || (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) ? "Mobile" : "Desktop";
  };

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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/ferramentas`);
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
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/ferramentas/${id}`);
      setFerramentas(ferramentas.filter((ferramenta) => ferramenta.id !== id)); 
    } catch (error) {
      setError("Erro ao excluir a ferramenta. Tente novamente.");
    }
  };

  const handleEdit = (id) => {
    router.push(`/ferramentas/cadastro-ferramentas?id=${id}`); 
  };

  return (
    <div className={style.body}>
      <Header />
      <Link href={"../"} className={style.back}><IoCaretBack /></Link>
      <h1 className={style.h1}>Ferramentas Disponíveis</h1>
      <h3 className={style.h3}>Tipo de dispositivo: {deviceType}</h3>
      {loading ? (
        <p className={style.loading}>Carregando...</p>
      ) : (
        <>
          {error && <p className={style.error}>{error}</p>}
          <ul className={style.container}>
            {ferramentas.length > 0 ? (
              ferramentas.map((ferramenta) => (
                <li key={ferramenta.id} className={style.card}>
                  <img src={ferramenta.img} alt={ferramenta.nome} className={style.imagem} />
                  <h2>{ferramenta.nome}</h2>
                  <p>{ferramenta.descricao}</p>
                  <button onClick={() => handleEdit(ferramenta.id)} className={style.editButton}><FaRegEdit /></button>
                  <button onClick={() => handleDelete(ferramenta.id)} className={style.deleteButton}><MdOutlineDelete /></button>
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