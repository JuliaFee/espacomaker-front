'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './reservai.module.css';
import Header from '../components/header/page';
import Footer from '../components/footer/page';
import PopUp from "@/app/components/popUp/PopUp";

const ImpressoraForm = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [impressoras, setImpressoras] = useState([]);
    const [selectedImpressora, setSelectedImpressora] = useState("");
    const [dataReserva, setDataReserva] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupTypeColor, setPopupTypeColor] = useState('');

    useEffect(() => {
        const fetchImpressoras = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/impressora`);
                setImpressoras(response.data.impressoras);
            } catch (error) {
                console.error("Erro ao buscar impressoras:", error.response ? error.response.data : error.message);
                setError("Erro ao carregar impressoras.");
            } finally {
                setLoading(false);
            }
        };
        fetchImpressoras();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedImpressora) {
            setError("Por favor, selecione uma impressora.");
            return;
        }

        try {
            const reservaResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/reserva-impressora`, {
                id_user: 1,
                id_impressora: selectedImpressora,
                data_reserva: dataReserva.toISOString().split('T')[0],
                status_reserva: true,
            });

            console.log("Reserva realizada:", reservaResponse.data);
            setError(null);

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
                <h2 className={styles.titleh2}>Reserva de Impressora</h2>
          
          {/* Mensagem de erro ou sucesso */}
          {(error || popupMessage) && (
                    <div className={`${styles.message} ${popupTypeColor === 'sucesso' ? styles.success : styles.error}`}>
                        {error || popupMessage}
                    </div>
                )}

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
                <div className={styles.calebox}>
                    <label htmlFor="data" className={styles.labelcale}>Selecionar data:</label>
                    <Calendar onChange={setDataReserva} value={dataReserva} className={styles.reactCalendar} />
                </div>
                <button type="submit" className={styles.button}>Realizar Reserva</button>
            </form>

          
            <Footer />
        </div>
    );
};

export default ImpressoraForm;
