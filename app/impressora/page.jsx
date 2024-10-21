"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./impressora.module.css";

const Impressora = () => {
  const [impressoras, setImpressoras] = useState([]);
  const [deviceType, setDeviceType] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className={style.body}>
      <h1>Impressoras Disponíveis</h1>
      <h3>{deviceType}</h3>
      {loading ? (
        <p>Carregando...</p>
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
                </div>
              ))
            ) : (
              <p>Nenhuma Impressora encontrada.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Impressora;
