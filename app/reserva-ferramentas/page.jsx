'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './reservaf.module.css';
import Header from '../components/header/page';
import Footer from '../components/footer/page';
import PopUp from "@/app/components/popUp/PopUp";
import { useRouter } from 'next/navigation';  // Importa o hook useRouter

const ReservaFerramentaForm = () => {
    const router = useRouter();  // Inicializa o hook useRouter
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupTypeColor, setPopupTypeColor] = useState('');
    const [ferramentas, setFerramentas] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [selectedFerramenta, setSelectedFerramenta] = useState("");
    const [selectedHorario, setSelectedHorario] = useState("");
    const [dataReserva, setDataReserva] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carregar ferramentas e horários
    useEffect(() => {
        const fetchFerramentas = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/ferramentas`);
                console.log('Ferramentas:', response.data);
                setFerramentas(response.data.ferramentas || []);
            } catch (error) {
                console.error("Erro ao buscar ferramentas:", error.response ? error.response.data : error.message);
                setError("Erro ao carregar ferramentas.");
            }
        };

        const fetchHorarios = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/horarios`);
                console.log('Horários:', response.data);

                if (response.data && response.data.horarios) {
                    setHorarios(response.data.horarios || []);
                } else {
                    setError("Formato de resposta de horários inválido.");
                }
            } catch (error) {
                console.error("Erro ao buscar horários:", error.response ? error.response.data : error.message);
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
                id_user: 1, // O ID do usuário deve ser dinâmico, provavelmente vindo do contexto ou da autenticação
                id_ferramenta: selectedFerramenta,
                id_horario: selectedHorario,
                data_reserva: dataReserva.toISOString().split('T')[0],
                status_reserva: true,
            });

            setError(null);
            setPopupMessage("Sua reserva foi realizada com sucesso!");
            setPopupTypeColor('sucesso');
            setIsPopupOpen(true);

            setTimeout(() => {
                setIsPopupOpen(false);
                router.push('reserva-ferramentas/reservaf-lista');  
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

    const handleFerramentaChange = (e) => {
        setSelectedFerramenta(e.target.value);
    };

    const handleHorarioChange = (e) => {
        setSelectedHorario(e.target.value);
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

                <select onChange={handleFerramentaChange} value={selectedFerramenta} className={styles.select}>
                    <option value="">Selecionar Ferramenta</option>
                    {ferramentas.length > 0 ? (
                        ferramentas.map((ferramenta) => (
                            <option key={ferramenta.id} value={ferramenta.id}>
                                {ferramenta.nome}
                            </option>
                        ))
                    ) : (
                        <option value="">Nenhuma ferramenta disponível</option>
                    )}
                </select>

                <select onChange={handleHorarioChange} value={selectedHorario} className={styles.select}>
                    <option value="">Selecionar Horário</option>
                    {horarios.length > 0 ? (
                        horarios.map((horario) => (
                            <option key={horario.id} value={horario.id}>
                                {horario.descricao}
                            </option>
                        ))
                    ) : (
                        <option value="">Nenhum horário disponível</option>
                    )}
                </select>

                <div className={styles.calendarContainer}>
                    <label htmlFor="data" className={styles.label}>Selecionar data:</label>
                    <Calendar onChange={setDataReserva} value={dataReserva} className={styles.calendar} />
                </div>

                <button type="submit" className={styles.button}>Realizar Reserva</button>
            </form>

            {isPopupOpen && <PopUp message={popupMessage} typeColor={popupTypeColor} onClose={() => setIsPopupOpen(false)} />}

            <Footer />
        </div>
    );
};

export default ReservaFerramentaForm;
