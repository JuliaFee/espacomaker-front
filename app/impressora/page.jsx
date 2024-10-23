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
    const fetchImpressora = async () => {
      try {
        console.log("Buscando impressoras...");
        const response = await axios.get("http://localhost:5000/impressora");
        console.log("Response:", response);

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
    fetchImpressora();
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
          <ul>
            {impressoras.length > 0 ? (
              impressoras.map((impressoras) => (
                <li key={impressoras.id}>
                <img src={impressoras.img} alt={impressoras.nome}/>   
                <h2>{impressoras.nome}</h2>
                <p>{impressoras.descricao}</p>
                <p>{impressoras.statusI}</p>
                </li>           
              ))
            ) : (
              <li>Nenhuma Impressora encontrada.</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Impressora;
