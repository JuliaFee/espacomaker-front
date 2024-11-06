"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./reservalista.module.css";
import Header from "@/app/components/header/page";
import Footer from "@/app/components/footer/page";

const reservaLista = () => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

//   const getDeviceType = () => {
//     const userAgent = navigator.userAgent;
//     return /android/i.test(userAgent) || (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) ? "Mobile" : "Desktop";
//   };

//   useEffect(() => {
//     const deviceType = getDeviceType();
//     document.body.classList.add(deviceType);
//     setDeviceType(deviceType);
//     return () => {
//       document.body.classList.remove(deviceType);
//     };
//   }, []);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        console.log("Buscando RESERVAS...");
        const response = await axios.get("http://localhost:3000/api/reservas");
        console.log("Response:", response);

        if (response.data && Array.isArray(response.data.reservas)) {
          setReservas(response.data.reservas);
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
    fetchReservas();
  }, []);

  return (
    <div className={style.body}>
      <Header />
      <h1 className={style.title}>Reservas agurdando aprovação</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {error && <p className={style.error}>{error}</p>}
          <ul>
            {reservas.length > 0 ? (
              reservas.map((reserva, index) => (
                <li key={index}>{reserva.id_user} 
                {reserva.id_ferramenta} 
                {reserva.id_impressora} 
                {reserva.data_reserva} 
                {reserva.hora_inicio} 
                {reserva.hora_fim} 
                {reserva.status_reserva}</li>
                
               
              ))
            ) : (
              <li className={style.message}>Ops! Nenhuma reserva foi feita ainda...</li>
            )}
          </ul>
        </>
      )}
      <Footer className={style.footer}/>
    </div>
  );
};

export default reservaLista;
