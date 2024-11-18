'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./reservalista.modules.css";
import Header from "@/app/components/header/page";
import Footer from "@/app/components/footer/page";
import PopUp2 from "@/app/components/popUp2/popUp2";

const ImpressoraList = () => {
  const [reservas, setReservas] = useState([]);
  const [impressoras, setImpressoras] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false); // Estado para controlar o popup
  const [popUpMessage, setPopUpMessage] = useState(""); // Mensagem do popup

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Começar o carregamento

        // Usando Promise.all para fazer as duas requisições simultaneamente
        const [reservaResponse, impressoraResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/reserva-impressora`),
          axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/impressora`)
        ]);

        // Verificando se a resposta contém os dados esperados
        if (reservaResponse.data && Array.isArray(reservaResponse.data.reservas)) {
          setReservas(reservaResponse.data.reservas);
        } else {
          console.error("Dados inesperados nas reservas:", reservaResponse.data);
          setError("Formato de dados inesperado nas reservas!");
        }

        if (impressoraResponse.data && Array.isArray(impressoraResponse.data.impressoras)) {
          setImpressoras(impressoraResponse.data.impressoras);
        } else {
          console.error("Dados inesperados nas impressoras:", impressoraResponse.data);
          setError("Formato de dados inesperado nas impressoras!");
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError("Erro interno ao buscar dados!");
      } finally {
        setLoading(false); // Fim do carregamento
      }
    };

    fetchData(); // Chama a função de buscar dados
  }, []);

  const getImpressoraNomeById = (id) => {
    const impressora = impressoras.find(impressora => impressora.id === id);
    return impressora ? impressora.nome : "Impressora não encontrada";
  };

  const handlePopUpClose = () => {
    setShowPopUp(false); // Fecha o popup
  };

  const handlePopUpOpen = (message) => {
    setPopUpMessage(message); // Define a mensagem do popup
    setShowPopUp(true); // Abre o popup
  };

  return (
    <div className={style.body}>
      <Header />
      <h1 className={style.title}>Reservas de Impressoras</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {error && <p className={style.error}>{error}</p>}
          <ul>
            {reservas.length > 0 ? (
              reservas.map((reserva, index) => (
                <li key={index}>
                  Impressora: {getImpressoraNomeById(reserva.id_impressora)}, 
                  Data: {reserva.data_reserva}
                  <button 
                    onClick={() => handlePopUpOpen(`Detalhes da reserva: Impressora ${getImpressoraNomeById(reserva.id_impressora)}, Data ${reserva.data_reserva}`)} 
                    className={style.detailsButton}
                  >
                    Ver detalhes
                  </button>
                </li>
              ))
            ) : (
              <li className={style.message}>Nenhuma reserva de impressora encontrada.</li>
            )}
          </ul>
        </>
      )}

      {/* PopUp2 */}
      {showPopUp && <PopUp2 message={popUpMessage} onClose={handlePopUpClose} />}

      <Footer className={style.footer} />
    </div>
  );
};

export default ImpressoraList;
