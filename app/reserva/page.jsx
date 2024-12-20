'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './reserva.module.css';
import Link from "next/link";
import Header from '../components/header/page';
import Footer from '../components/footer/page';
import { IoCaretBack } from "react-icons/io5";


const BookingForm = () => {
    const [ferramentas, setFerramentas] = useState([]);
    const [impressoras, setImpressoras] = useState([]);
    const [selectedFerramenta, setSelectedFerramenta] = useState(null);
    const [selectedImpressora, setSelectedImpressora] = useState(null);
    const [dataReserva, setDataReserva] = useState(new Date());
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFim, setHoraFim] = useState('');
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
            await Promise.all([fetchFerramentas(), fetchImpressoras()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ((!selectedFerramenta && !selectedImpressora) || (selectedFerramenta && selectedImpressora)) {
            setError("Por favor, selecione apenas uma Ferramenta ou uma Impressora.");
            return;
        }

        try {
            // Converter os valores de horaInicio e horaFim para o formato correto
            const horaInicioFormatada = `${horaInicio}:00`;
            const horaFimFormatada = `${horaFim}:00`;

            // Requisição para a rota /api/horarios
            const horarioResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/horarios`, {
                id_ferramenta: selectedFerramenta ? Number(selectedFerramenta) : null,
                id_impressora: selectedImpressora ? Number(selectedImpressora) : null,
                hora_inicio: horaInicioFormatada,
                hora_fim: horaFimFormatada,
            });

            const idHorario = horarioResponse.data.id;

            // Requisição para a rota /api/reservas
            const reservaResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/reservas`, {
                id_user: 1,
                id_ferramenta: selectedFerramenta || null,
                id_impressora: selectedImpressora || null,
                id_horario: idHorario,
                data_reserva: dataReserva.toISOString().split('T')[0],
                status_reserva: true,
            });

            console.log("Reserva realizada:", reservaResponse.data);
            setError(null);  // Limpa o erro após uma reserva bem-sucedida
        } catch (error) {
            // Verifica o tipo de erro e exibe uma única mensagem de erro
            const errorMessage = error.response?.data?.message || error.message || "Erro desconhecido.";
            console.error("Erro ao realizar reserva:", errorMessage);
            setError("Erro ao realizar reserva: " + errorMessage);
        }

    };

    const handleFerramentaChange = (e) => {
        setSelectedFerramenta(e.target.value);
        setSelectedImpressora(null);
    };

    const handleImpressoraChange = (e) => {
        setSelectedImpressora(e.target.value);
        setSelectedFerramenta(null);
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className={styles.page}>
            <Header />
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.titleh2}>Reserva</h2>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                
                        <select
                            onChange={handleFerramentaChange}
                            value={selectedFerramenta || ""}
                            className={styles.selectFerramenta}
                        >
                            <option value="">Selecionar Ferramenta</option>
                            {ferramentas.map((ferramenta) => (
                                <option key={ferramenta.id} value={ferramenta.id}>
                                    {ferramenta.nome}
                                </option>
                            ))}
                        </select>

                        <select
                            onChange={handleImpressoraChange}
                            value={selectedImpressora || ""}
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

                    <div className={styles.brick2}>
                    <label htmlFor="horaInicio" className={styles.label}>Hora de Início:</label>
                    <input
                        type="time"
                        id="horaInicio"
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                        className={styles.input}
                    />
               

                <label htmlFor="horaFim" className={styles.label2}>Hora de Término:</label>
                <input
                    type="time"
                    id="horaFim"
                    value={horaFim}
                    onChange={(e) => setHoraFim(e.target.value)}
                    className={styles.input}
                />
                </div>
                </div>
                <button type="submit" className={styles.button}>Realizar Reserva</button>
            </form>
            <Footer />
        </div>
    );
};

export default BookingForm;