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

    const formatarData = (data) => {
        const [dia, mes, ano] = data.split('/');
        const dataAjustada = new Date(`${ano}-${mes}-${dia}`);
        dataAjustada.setDate(dataAjustada.getDate() + 1); // Adiciona 1 dia
        return dataAjustada.toLocaleDateString();
      };

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/reserva-ferramenta`);
                console.log('Resposta da API de reservas:', response.data);

                // Verifique se a API retorna a lista corretamente
                if (response.data && response.data.reservas) {
                    setReservas(response.data.reservas);
                } else {
                    setError('Erro: Estrutura inesperada na resposta da API.');
                    console.error('Erro: Resposta inesperada da API de reservas:', response.data);
                }
            } catch (error) {
                console.error("Erro ao buscar reservas:", error.response ? error.response.data : error.message);
                setError("Erro ao carregar reservas. Verifique sua conexão ou contate o suporte.");
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
            {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

            <div className={styles.reservasList}>
                {reservas.length > 0 ? (
                    reservas.map((reserva) => (
                        <div key={reserva.id} className={styles.reservaItem}>
                            <p><strong>Ferramenta:</strong> {reserva.id_ferramenta || 'N/A'}</p>
                            <p><strong>Data:</strong> {reserva.data_reserva ? formatarData(reserva.data_reserva) : 'N/A'}</p>
                            <p><strong>Horário:</strong> {reserva.id_horario || 'N/A'}</p>
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
