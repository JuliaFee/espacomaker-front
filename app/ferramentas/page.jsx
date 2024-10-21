"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Ferramentas = () => {
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
          <div className={style.container}>
            {ferramentas.length > 0 ? (
              ferramentas.map((ferramenta) => (
                <div key={ferramenta.id} className={style.card}>
                  <img src={ferramenta.img} alt={ferramenta.nome} className={style.imagem} />
                  <h2>{ferramenta.nome}</h2>
                  <p>{ferramenta.descricao}</p>
                </div>
              ))
            ) : (
              <p>Nenhuma ferramenta encontrada.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Ferramentas;
