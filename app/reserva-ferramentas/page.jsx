'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './reservaf.module.css';
import Header from '../components/header/page';
import Footer from '../components/footer/page';
import { useRouter } from 'next/navigation';

const ReservaFerramentaForm = () => {
    const router = useRouter();
    const [ferramentas, setFerramentas] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [selectedFerramenta, setSelectedFerramenta] = useState("");
    const [selectedHorario, setSelectedHorario] = useState("");
    const [dataReserva, setDataReserva] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupTypeColor, setPopupTypeColor] = useState('');

    useEffect(() => { 
        const fetchFerramentas = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/ferramentas`);
                setFerramentas(response.data.ferramentas || []);
            } catch (error) {
                setError("Erro ao carregar ferramentas.");
            }
        };

        const fetchHorarios = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/horarios`);
                if (response.data && response.data.horarios) {
                    setHorarios(response.data.horarios || []);
                } else {
                    setError("Formato de resposta de horários inválido.");
                }
            } catch (error) {
                setError("Erro ao carregar horários.");
            }
        };

        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchFerramentas(), fetchHorarios()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFerramenta || !selectedHorario) {
            setError("Por favor, selecione uma ferramenta e um horário.");
            return;
        }

        try {
            const reservaResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/reserva-ferramenta`, {
                id_user: 1, // Ajustar para o ID real do usuário
                id_ferramenta: selectedFerramenta,
                id_horario: selectedHorario,
                data_reserva: dataReserva.toISOString().split('T')[0],
                status_reserva: true,
            });

            setError(null);
            setPopupMessage("Sua reserva foi realizada com sucesso!");
            setPopupTypeColor('sucesso');

            setTimeout(() => {
                router.push('reserva-ferramentas/reservaf-lista');
            }, 3000);

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Erro desconhecido.";
            setError("Erro ao realizar reserva: " + errorMessage);
            setPopupMessage('');
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className={styles.page}>
            <Header />
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.titleh2}>Reserva de Ferramenta</h2>

                {/* Mensagem de erro ou sucesso */}
                {(error || popupMessage) && (
                    <div className={`${styles.message} ${popupTypeColor === 'sucesso' ? styles.success : styles.error}`}>
                        {error || popupMessage}
                    </div>
                )}

                <select onChange={(e) => setSelectedFerramenta(e.target.value)} value={selectedFerramenta} className={styles.select}>
                    <option value="">Selecionar Ferramenta</option>
                    {ferramentas.map((ferramenta) => (
                        <option key={ferramenta.id} value={ferramenta.id}>
                            {ferramenta.nome}
                        </option>
                    ))}
                </select>

                <select onChange={(e) => setSelectedHorario(e.target.value)} value={selectedHorario} className={styles.select}>
                    <option value="">Selecionar Horário</option>
                    {horarios.map((horario) => (
                        <option key={horario.id} value={horario.id}>
                            {horario.hora_inicio} - {horario.hora_fim}
                        </option>
                    ))}
                </select>

                <div className={styles.calendarContainer}>
                    <label htmlFor="data" className={styles.label}>Selecionar data:</label>
                    <Calendar onChange={setDataReserva} value={dataReserva} className={styles.calendar} />
                </div>

                <button type="submit" className={styles.button}>Realizar Reserva</button>
            </form>
            <Footer />
        </div>
    );
};

export default ReservaFerramentaForm;
