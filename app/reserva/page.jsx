'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './reserva.module.css'; 

const BookingForm = () => {
    const [ferramentas, setFerramentas] = useState([]);
    const [impressoras, setImpressoras] = useState([]);
    const [selectedFerramenta, setSelectedFerramenta] = useState('');
    const [selectedImpressora, setSelectedImpressora] = useState('');
    const [dataReserva, setDataReserva] = useState(new Date());
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFim, setHoraFim] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      //fetch das ferramentas
        const fetchFerramentas = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/ferramentas");
                setFerramentas(response.data.ferramentas);
            } catch (error) {
                console.error("Erro ao buscar ferramentas:", error.response ? error.response.data : error.message);
                setError("Erro ao carregar ferramentas.");
            }
        };

        //fetch das impressoras
        const fetchImpressoras = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/impressora");
                setImpressoras(response.data.impressoras);
            } catch (error) {
                console.error("Erro ao buscar impressoras:", error.response ? error.response.data : error.message);
                setError("Erro ao carregar impressoras.");
            }
        };


        //fetch dos dados
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchFerramentas(), fetchImpressoras()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // verificacao
      if (!selectedFerramenta || !selectedImpressora || !horaInicio || !horaFim) {
          setError("Por favor, preencha todos os campos.");
          return;
      }
  
      const reserva = {
          id_user: 1, // <---- provisorio
          id_ferramenta: selectedFerramenta,
          id_impressora: selectedImpressora,
          data_reserva: dataReserva.toISOString().split('T')[0],
          hora_inicio: horaInicio,
          hora_fim: horaFim,
          status_reserva: 'true',
      };
  
      try {
          const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/reservas", reserva);
          console.log("Reserva realizada:", response.data);
  
          // put q altera so o status da ferramenta e impressora para true
          await axios.put(process.env.NEXT_PUBLIC_BASE_URL + `/ferramentas/${selectedFerramenta}`, { statusF: true });
          await axios.put(process.env.NEXT_PUBLIC_BASE_URL + `/impressora/${selectedImpressora}`, { statusI: true });
  
          setError(null); 
      } catch (error) {
          console.error("Erro ao realizar reserva:", error.response ? error.response.data : error.message);
          setError("Erro ao realizar reserva.");
      }
  };
  //loadings
  if (loading) {
      return <div>Carregando...</div>;
  }
    return (
      //formulario
        <form onSubmit={handleSubmit}>
            <h2>Booking Form</h2>
            {/* //trataçao de erro */}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <select onChange={(e) => setSelectedFerramenta(e.target.value)} value={selectedFerramenta}>
                <option value="">Select Ferramenta</option>
                {/* map de ferramentas */}
                {ferramentas.map((ferramenta) => (
                    <option key={ferramenta.id} value={ferramenta.id}>
                        {ferramenta.nome}
                    </option>
                ))}
            </select>
            <select onChange={(e) => setSelectedImpressora(e.target.value)} value={selectedImpressora}>
                <option value="">Select Impressora</option>
                {/* map de impressoras */}
                {impressoras.map((impressora) => (
                    <option key={impressora.id} value={impressora.id}>
                        {impressora.nome}
                    </option>
                ))}
            </select>
{/* calendario */}
            <Calendar onChange={setDataReserva} value={dataReserva} />
{/* inputs de hora */}
            <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
            <input type="time" value={horaFim} onChange={(e) => setHoraFim(e.target.value)} />
            <button type="submit">Book</button>
        </form>
    );
};

export default BookingForm;