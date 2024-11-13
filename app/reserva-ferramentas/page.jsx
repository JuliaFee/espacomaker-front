'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './reservaf.module.css';
import Header from '../components/header/page';
import Footer from '../components/footer/page';
import PopUp from "@/app/components/popUp/PopUp"; // Importando o PopUp

const FerramentaForm = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupTypeColor, setPopupTypeColor] = useState('');
    const [ferramentas, setFerramentas] = useState([]);
    const [selectedFerramenta, setSelectedFerramenta] = useState("");
    const [dataReserva, setDataReserva] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFerramentas = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/ferramentas`);
                setFerramentas(response.data.ferramentas);
            } catch (error) {
                console.error("Erro ao buscar ferramentas:", error.response ? error.response.data : error.message);
                setError("Erro ao carregar ferramentas.");
            }
        };

        const fetchData = async () => {
            setLoading(true);
            await fetchFerramentas();
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFerramenta) {
            setError("Por favor, selecione uma ferramenta.");
            return;
        }

        try {
            const reservaResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/reserva-ferramenta`, {
                id_user: 1, // Substituir pelo ID do usuário logado
                id_ferramenta: selectedFerramenta,
                data_reserva: dataReserva.toISOString().split('T')[0],
                status_reserva: true,
            });

            console.log("Reserva realizada:", reservaResponse.data);
            setError(null);

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

    const handleFerramentaChange = (e) => {
        setSelectedFerramenta(e.target.value);
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className={styles.page}>
            <Header />
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.titleh2}>Reserva de Ferramenta</h2>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <select
                    onChange={handleFerramentaChange}
                    value={selectedFerramenta}
                    className={styles.selectFerramenta}
                >
                    <option value="">Selecionar Ferramenta</option>
                    {ferramentas.map((ferramenta) => (
                        <option key={ferramenta.id} value={ferramenta.id}>
                            {ferramenta.nome}
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

export default FerramentaForm;
