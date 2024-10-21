"use client";
import React, { useState, useEffect } from 'react';
import styles from './cadastroreserva.module.css';
import axios from 'axios';
// import Header from "./login";
// import Footer from "./login";


const ReservaForm = () => {
    const [nome, setNome] = useState('');
    const [ferramenta, setFerramenta] = useState('');
    const [impressora, setImpressora] = useState('');
    const [horario, setHorario] = useState('');
    const [data, setData] = useState('');
    const [status, setStatus] = useState('');


    useEffect (() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/reservas");
                console.log('Dados recebidos da API:', response.data);
                console.log('Esta funfando tomaaa macetabdo');
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao obter os dados da API:', error);
                console.error('teste', error);
            }
        };
        fetchData();
        
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Crie um objeto com os dados que você deseja enviar
        const novaReserva = {
            nome,
            ferramenta,
            impressora,
            horario,
            data,
            status,
        };
    
        console.log(novaReserva); // Para verificar o objeto que será enviado
    
        try {
            // Envie o objeto como o segundo argumento para a requisição POST
            const response = await axios.post("http://localhost:5000/reservas", novoUsuario);
            console.log('Reserva realizada:', response.data);
        } catch (error) {
            console.error('Erro ao realizar reserva:', error);
        }
    
    };
    

    return (

        <div className={styles.pageContainer}>
            {/* <Header></Header> */}
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <p className={styles.title}>Login</p>
                        <label htmlFor="nome" className={styles.label}>Nome:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="ferramenta" className={styles.label}>Ferramenta:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="ferramenta"
                            value={ferramenta}
                            onChange={(e) => setFerramenta(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="impressora" className={styles.label}>Impressora:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="impressora"
                            value={impressora}
                            onChange={(e) => setImpressora(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="horario" className={styles.label}>Horário:</label>
                        <input
                            type="time"
                            className={styles.input}
                            id="horario"
                            value={horario}
                            onChange={(e) => setHorario(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="data" className={styles.label}>Data:</label>
                        <input
                            type="date"
                            className={styles.input}
                            id="data"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="status" className={styles.label}>Staus:</label>
                        <input
                            type="select"
                            className={styles.input}
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className={`${styles.button} ${styles.submitButton}`}
                    >
                        Entrar
                    </button>
                </form>
         
            </div>

            {/* <Footer></Footer> */}
        </div>
    );
};

export default ReservaForm;