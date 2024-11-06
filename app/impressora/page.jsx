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

const Impressora = () => {
  const [impressoras, setImpressoras] = useState([]);
  const [deviceType, setDeviceType] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const handleDelete = async (id) =>{
    try  {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/impressora/${id}`);
      setImpressoras(impressoras.filter((impressora) => impressora.id !== id));
    } catch (error) {
      setError("erro ao excluir a impressora, tente novamente");
    }
  };

  const handleEdit = (id) => {
    router.push(`/impressora/cadastro-impressora?id=${id}`);
  };

  return (
    <div className={style.body}>
      <Header />
      <Link href="../" className={style.back}> <IoCaretBack /> </Link>
      <h1 className={style.h1}>Impressoras Disponíveis</h1>
      <h3 className={style.h3}>Tipo de dispositivo: {deviceType}</h3>
      {/* <h1>Impressoras Disponíveis</h1> */}
      {/* <h3>{deviceType}</h3> */}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {error && <p className={style.error}>{error}</p>}
          <div className={style.container}>
            {impressoras.length > 0 ? (
              impressoras.map((impressora) => (
                <li key={impressora.id} className={style.card}>
                  <img src={impressora.img} alt={impressora.nome} className={style.imagem} />
                  <h2>{impressora.nome}</h2>
                  <p>{impressora.descricao}</p>
                  <p>{impressora.filamento}</p>
                  
                  <button onClick={() => handleEdit(impressora.id)} className={style.editButton}>
                    <FaRegEdit />
                  </button>
                  <button onClick={() => handleDelete(impressora.id)} className={style.deleteButton}>
                    <MdOutlineDelete />
                  </button>
                </li>
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
