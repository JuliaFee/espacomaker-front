'use client'; 
import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import './reserva.module.css'; 

import Link from "next/link";
import Header from '../components/header/page';
import Footer from '../components/footer/page';
import styles from "./reserva.module.css";

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
                const response = await axios.get("http://localhost:5000/ferramentas");
                setFerramentas(response.data.ferramentas);
            } catch (error) {
                console.error("Erro ao buscar ferramentas:", error.response ? error.response.data : error.message);
                setError("Erro ao carregar ferramentas.");
            }
        };

        //fetch das impressoras
        const fetchImpressoras = async () => {
            try {
                const response = await axios.get("http://localhost:5000/impressora");
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
          const response = await axios.post("http://localhost:5000/reservas", reserva);
          console.log("Reserva realizada:", response.data);
  
          // put q altera so o status da ferramenta e impressora para true
          await axios.put(`http://localhost:5000/ferramentas/${selectedFerramenta}`, { statusF: true });
          await axios.put(`http://localhost:5000/impressora/${selectedImpressora}`, { statusI: true });
  
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
      <div className={styles.page}>
        <Header></Header>
        <Link href={"../"} className={styles.back}>Ir para home</Link>
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Booking Form</h2>
            {/* //trataçao de erro */}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <select onChange={(e) => setSelectedFerramenta(e.target.value)} value={selectedFerramenta}>
                <option value="" >Select Ferramenta</option>
                {/* map de ferramentas */}
                {ferramentas.map((ferramenta) => (
                    <option key={ferramenta.id} value={ferramenta.id}>
                        {ferramenta.nome}
                    </option>
                ))}
            </select>
            <select onChange={(e) => setSelectedImpressora(e.target.value)} value={selectedImpressora}>
                <option value="" >Select Impressora</option>
                {/* map de impressoras */}
                {impressoras.map((impressora) => (
                    <option key={impressora.id} value={impressora.id}>
                        {impressora.nome}
                    </option>
                ))}
            </select>
{/* calendario */}
            <Calendar onChange={setDataReserva} value={dataReserva} className={styles.calendar}/>
{/* inputs de hora */}
            <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
            <input type="time" value={horaFim} onChange={(e) => setHoraFim(e.target.value)} />
            <button type="submit" className={styles.button}>Book</button>
        </form>
        <Footer></Footer>
        </div>
    );
};
=======
import Link from "next/link"; 

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
        // Fetch das ferramentas e impressoras 
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

        // Fetch de dados iniciais 
        const fetchData = async () => { 
            setLoading(true); 
            await Promise.all([fetchFerramentas(), fetchImpressoras()]); 
            setLoading(false); 
        }; 

        fetchData(); 
    }, []); 

    const handleSubmit = async (e) => { 
        e.preventDefault(); 

        // Verifica se apenas uma opção está selecionada 
        if ((!selectedFerramenta && !selectedImpressora) || (selectedFerramenta && selectedImpressora)) { 
            setError("Por favor, selecione apenas uma Ferramenta ou uma Impressora."); 
            return; 
        } 

        try { 
            // Criação do horário apenas para a opção selecionada 
            const horarioResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/horarios`, { 
                id_ferramenta: selectedFerramenta || null, 
                id_impressora: selectedImpressora || null, 
                hora_inicio: horaInicio, 
                hora_fim: horaFim, 
            }); 

            const idHorario = horarioResponse.data.id; 

            // Criação da reserva com a data e o id do horário 
            const reservaResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/reservas`, { 
                id_user: 1, // Provisório 
                id_ferramenta: selectedFerramenta || null, 
                id_impressora: selectedImpressora || null, 
                id_horario: idHorario, 
                data_reserva: dataReserva.toISOString().split('T')[0], 
                status_reserva: true, 
            }); 

            console.log("Reserva realizada:", reservaResponse.data); 
            setError(null); 
        } catch (error) { 
            console.error("Erro ao realizar reserva:", error.response ? error.response.data : error.message); 
            setError("Erro ao realizar reserva."); 
        } 
    }; 

    const handleFerramentaChange = (e) => { 
        setSelectedFerramenta(e.target.value); 
        setSelectedImpressora(null); // Reseta a impressora se ferramenta for selecionada 
    }; 

    const handleImpressoraChange = (e) => { 
        setSelectedImpressora(e.target.value); 
        setSelectedFerramenta(null); // Reseta a ferramenta se impressora for selecionada 
    }; 

    if (loading) { 
        return <div>Carregando...</div>; 
    } 

    return ( 
        <form onSubmit={handleSubmit}> 
            <Link href={"../"}>Ir para home</Link> 
            <h2>Booking Form</h2> {error && <div style={{ color: 'red' }}>{error}</div>} 

            <select onChange={handleFerramentaChange} value={selectedFerramenta || ""}> 
                <option value="">Select Ferramenta</option> 
                {ferramentas.map((ferramenta) => ( 
                    <option key={ferramenta.id} value={ferramenta.id}> 
                        {ferramenta.nome} 
                    </option> 
                ))} 
            </select> 

            <select onChange={handleImpressoraChange} value={selectedImpressora || ""}> 
                <option value="">Select Impressora</option> 
                {impressoras.map((impressora) => ( 
                    <option key={impressora.id} value={impressora.id}> 
                        {impressora.nome} 
                    </option> 
                ))} 
            </select> 

            <Calendar onChange={setDataReserva} value={dataReserva} /> 

            <input 
                type="time" 
                value={horaInicio} 
                onChange={(e) => setHoraInicio(e.target.value)} 
            /> 

            <input 
                type="time" 
                value={horaFim} 
                onChange={(e) => setHoraFim(e.target.value)} 
            /> 

            <button type="submit">Book</button> 
        </form> 
    ); 
}; 


export default BookingForm;