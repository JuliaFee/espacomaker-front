'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './reservai.modules.css'
import Header from '../components/header/page';
import Footer from '../components/footer/page';
import PopUp from "@/app/components/popUp/PopUp"; // Importando o PopUp

const ImpressoraForm = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para controlar o PopUp
    const [popupMessage, setPopupMessage] = useState(''); // Mensagem do PopUp
    const [popupTypeColor, setPopupTypeColor] = useState(''); // Cor do PopUp (sucesso/erro)
    const [impressoras, setImpressoras] = useState([]);
    const [selectedImpressora, setSelectedImpressora] = useState(""); // Inicializado como string vazia
    const [dataReserva, setDataReserva] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImpressoras = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/impressora`);
                setImpressoras(response.data.impressoras);
            } catch (error) {
                console.error("Erro ao buscar impressoras:", error.response ? error.response.data : error.message);
                setError("Erro ao carregar impressoras.");
            }
        };

        const fetchData = async () => {
            setLoading(true);
            await fetchImpressoras();
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedImpressora) {
            setError("Por favor, selecione uma impressora.");
            return;
        }

        try {
            const reservaResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/reserva-impressora`, {
                id_user: 1, // Substituir pelo ID do usuário logado
                id_impressora: selectedImpressora,
                data_reserva: dataReserva.toISOString().split('T')[0],
                status_reserva: true,
            });

            console.log("Reserva realizada:", reservaResponse.data);
            setError(null);  // Limpa o erro após uma reserva bem-sucedida

            // Exibindo o PopUp de sucesso
            setPopupMessage("Sua reserva foi realizada com sucesso!");
            setPopupTypeColor('sucesso');
            setIsPopupOpen(true);

            setTimeout(() => {
                setIsPopupOpen(false);
            }, 3000);

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Erro desconhecido.";
            console.error("Erro ao realizar reserva:", errorMessage);
            setError("Erro ao realizar reserva: " + errorMessage);

            // Exibindo o PopUp de erro
            setPopupMessage("Houve um erro ao realizar sua reserva.");
            setPopupTypeColor('erro');
            setIsPopupOpen(true);

            setTimeout(() => {
                setIsPopupOpen(false);
            }, 3000);
        }
    };

    const handleImpressoraChange = (e) => {
        setSelectedImpressora(e.target.value);
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className={styles.page}>
            <Header />
            <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.titleh2}>Reserva Impressoras</h2>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <select
                    onChange={handleImpressoraChange}
                    value={selectedImpressora}
                    className={styles.selectImpressora}
                >
                    <option value="">Selecionar Impressora</option>
                    {impressoras.map((impressora) => (
                        <option key={impressora.id} value={impressora.id}>
                            {impressora.nome}
                        </option>
                    ))}
                </select>
                <div className={styles.brick1}>
                    <div className={styles.calebox}>
                        <label htmlFor="data" className={styles.labelcale}>Selecionar data:</label>
                        <Calendar onChange={setDataReserva} value={dataReserva} className={styles.calendar} />
                    </div>
                </div>
                <button type="submit" className={styles.button}>Realizar Reserva</button>
            </form>

            {/* Exibindo o PopUp */}
            {isPopupOpen && <PopUp message={popupMessage} typeColor={popupTypeColor} onClose={() => setIsPopupOpen(false)} />}

            <Footer />
        </div>
    );
};

export default ImpressoraForm;
