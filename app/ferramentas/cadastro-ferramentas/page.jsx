"use client"; // Garante que este é um componente client-side
import React, { useState, useEffect } from 'react';
import styles from './cadastroferramentas.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Importa o useRouter para redirecionamento

const CadastroFerramentas = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [img, setImg] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Estado para mensagem de sucesso
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagem de erro
    const router = useRouter(); // Hook para redirecionar o usuário

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/ferramentas");
                console.log('Dados recebidos da API:', response.data);
                // Se necessário, armazene os dados da API em um estado
            } catch (error) {
                console.error('Erro ao obter os dados da API:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Crie um objeto com os dados que você deseja enviar
        const novaFerramenta = {
            nome,
            descricao,
            img
        };
    
        console.log(novaFerramenta); // Para verificar o objeto que será enviado
    
        try {
            // Envie o objeto como o segundo argumento para a requisição POST
            const response = await axios.post("http://localhost:5000/ferramentas", novaFerramenta);
            console.log('Ferramenta cadastrada:', response.data);
            setSuccessMessage('Ferramenta cadastrada com sucesso!');
            setNome('');
            setDescricao('');
            setImg('');

            // Redireciona para a página de ferramentas após 3 segundos
            setTimeout(() => {
                setSuccessMessage(''); // Limpa a mensagem de sucesso
                router.push("/ferramentas"); // Redireciona o usuário para a página de ferramentas
            }, 3000);
        } catch (error) {
            console.error('Erro ao realizar o cadastro de ferramentas', error);
            setErrorMessage('Erro ao realizar o cadastro. Tente novamente.');
        }
    };
    
    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <p className={styles.title}>Cadastro de Ferramentas</p>
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
                        <label htmlFor="descricao" className={styles.label}>Descrição:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="img" className={styles.label}>Imagem:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="img"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`${styles.button} ${styles.submitButton}`}
                    >
                        Cadastrar
                    </button>
                </form>

                {/* Exibição de mensagens de sucesso ou erro */}
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default CadastroFerramentas;
