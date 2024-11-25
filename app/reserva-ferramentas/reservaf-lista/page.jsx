'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './reservalista.module.css';
import Header from '../../components/header/page';
import Footer from '../../components/footer/page';

const ReservasfLista = () => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/reserva-ferramenta`); // Ajuste a URL conforme necessário
                console.log('Reservas:', response.data);
                setReservas(response.data.reservas || []);  // Ajuste conforme a estrutura de resposta
            } catch (error) {
                console.error("Erro ao buscar reservas:", error.response ? error.response.data : error.message);
                setError("Erro ao carregar reservas.");
            } finally {
                setLoading(false);
            }
        };

        fetchReservas();
    }, []);

    if (loading) {
        return <div>Carregando reservas...</div>;
    }

    return (
        <div className={styles.page}>
            <Header />
            <h2 className={styles.titleh2}>Minhas Reservas</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}

            <div className={styles.reservasList}>
                {reservas.length > 0 ? (
                    reservas.map((reserva) => (
                        <div key={reserva.id} className={styles.reservaItem}>
                            <p><strong>Ferramenta:</strong> {reserva.ferramenta.nome}</p>
                            <p><strong>Data:</strong> {new Date(reserva.data_reserva).toLocaleDateString()}</p>
                            <p><strong>Horário:</strong> {reserva.horario.descricao}</p>
                            <p><strong>Status:</strong> {reserva.status_reserva ? 'Confirmada' : 'Cancelada'}</p>
                        </div>
                    ))
                ) : (
                    <div>Você ainda não tem reservas.</div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default ReservasfLista;