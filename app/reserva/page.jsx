'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';

const BookingForm = () => {
  const [ferramentas, setFerramentas] = useState([]);
  const [impressoras, setImpressoras] = useState([]);
  const [selectedFerramenta, setSelectedFerramenta] = useState('');
  const [selectedImpressora, setSelectedImpressora] = useState('');
  const [dataReserva, setDataReserva] = useState(new Date());
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [loading, setLoading] = useState(true); // Estado para controle de loading
  const [error, setError] = useState(null); // Estado para erros

  useEffect(() => {
    const fetchFerramentas = async () => {
      try {
        const response = await axios.get("http://localhost:5001/ferramentas");
        setFerramentas(response.data.ferramentas);
      } catch (error) {
        console.error("Erro ao buscar ferramentas:", error.response ? error.response.data : error.message);
        setError("Erro ao carregar ferramentas.");
      }
    };
  
    const fetchImpressoras = async () => {
      try {
        const response = await axios.get("http://localhost:5001/impressoras");
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
    const reserva = {
      id_user: 1, // Substitua pelo ID real do usuário
      id_ferramenta: selectedFerramenta,
      id_impressora: selectedImpressora,
      data_reserva: dataReserva.toISOString().split('T')[0],
      hora_inicio: horaInicio,
      hora_fim: horaFim,
    };

    try {
      const response = await axios.post("http://localhost:5001/reservas", reserva); // URL da API de reservas
      console.log("Reserva realizada:", response.data);

      // Atualizar status da ferramenta e impressora para false
      await axios.put(`http://localhost:5001/ferramentas/${selectedFerramenta}`, { statusF: false });
      await axios.put(`http://localhost:5001/impressoras/${selectedImpressora}`, { statusI: false });
    } catch (error) {
      console.error("Erro ao realizar reserva:", error.response ? error.response.data : error.message);
      setError("Erro ao realizar reserva.");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Exibe mensagem de carregamento
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Booking Form</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Exibe mensagem de erro se houver */}
      <select onChange={(e) => setSelectedFerramenta(e.target.value)} value={selectedFerramenta}>
        <option value="">Select Ferramenta</option>
        {ferramentas.map((ferramenta) => (
          <option key={ferramenta.id} value={ferramenta.id}>
            {ferramenta.nome}
          </option>
        ))}
      </select>
      <select onChange={(e) => setSelectedImpressora(e.target.value)} value={selectedImpressora}>
        <option value="">Select Impressora</option>
        {impressoras.map((impressora) => (
          <option key={impressora.id} value={impressora.id}>
            {impressora.nome}
          </option>
        ))}
      </select>
      <Calendar
        onChange={setDataReserva}
        value={dataReserva}
      />
      <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
      <input type="time" value={horaFim} onChange={(e) => setHoraFim(e.target.value)} />
      <button type="submit">Book</button>
    </form>
  );
};

export default BookingForm;
