"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./home.module.css";

const Home = () => {
  const [ferramentas, setFerramentas] = useState([]);
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
    const fetchFerramentas = async () => {
      try {
        console.log("Buscando ferramentas...");
        const response = await axios.get("http://localhost:3000/api/ferramentas");
        console.log("Response:", response);

        if (response.data && Array.isArray(response.data.ferramentas)) {
          setFerramentas(response.data.ferramentas);
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
    fetchFerramentas();
  }, []);

  return (
    <div className={style.body}>
      <h1>Ferramentas Disponíveis</h1>
      <h3>{deviceType}</h3>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {error && <p className={style.error}>{error}</p>}
          <ul>
            {ferramentas.length > 0 ? (
              ferramentas.map((ferramenta, index) => (
                <li key={index}>{ferramenta.nome}</li>
               
              ))
            ) : (
              <li>Nenhuma ferramenta encontrada.</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Home;
