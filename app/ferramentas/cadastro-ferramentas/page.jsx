"use client"; 
import React, { useState, useEffect } from 'react';
import styles from './cadastroferramentas.module.css';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation'; 

const CadastroFerramentas = () => {
    const [nome, setNome] = useState('');         // Estado para o campo nome
    const [descricao, setDescricao] = useState(''); // Estado para o campo descrição
    const [img, setImg] = useState('');            // Estado para o campo imagem
    const [successMessage, setSuccessMessage] = useState('');  // Mensagem de sucesso
    const [errorMessage, setErrorMessage] = useState('');      // Mensagem de erro
    const router = useRouter();          // Hook para redirecionamento
    const searchParams = useSearchParams();   // Hook para pegar query params
    const editId = searchParams.get('id');    // Obtém o ID da URL para saber se está editando ou criando

    useEffect(() => {
        // Se existir um ID (modo de edição), buscar os dados da ferramenta para preencher o formulário
        if (editId) {
            const fetchFerramenta = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/ferramentas/${editId}`);
                    const { nome, descricao, img } = response.data; // Desestrutura os dados recebidos
                    setNome(nome);            // Preenche o campo "nome"
                    setDescricao(descricao);  // Preenche o campo "descrição"
                    setImg(img);              // Preenche o campo "imagem"
                } catch (error) {
                    console.error('Erro ao carregar a ferramenta:', error);
                    setErrorMessage('Erro ao carregar os dados da ferramenta.');
                }
            };
            fetchFerramenta(); // Chama a função para buscar os dados da ferramenta
        }
    }, [editId]); // Executa esse efeito apenas quando o editId mudar

    const updateFerramenta = async (e) => {
        e.preventDefault(); // Evita o reload da página ao submeter o formulário

        const ferramentaData = { nome, descricao, img }; // Dados a serem enviados para a API

        try {
            if (editId) {
                // Se houver um editId, significa que estamos editando a ferramenta existente
                await axios.put(`http://localhost:5000/ferramentas/${editId}`, ferramentaData);
                setSuccessMessage('Ferramenta atualizada com sucesso!'); // Exibe mensagem de sucesso
            } else {
                // Se não houver editId, estamos criando uma nova ferramenta
                await axios.post("http://localhost:5000/ferramentas", ferramentaData);
                setSuccessMessage('Ferramenta cadastrada com sucesso!'); // Exibe mensagem de sucesso
            }
            // Limpa os campos após o sucesso da operação
            setNome('');
            setDescricao('');
            setImg('');
            setTimeout(() => {
                setSuccessMessage('');  // Limpa a mensagem de sucesso após um tempo
                router.push("/ferramentas"); // Redireciona para a lista de ferramentas
            }, 3000); // Tempo de exibição da mensagem
        } catch (error) {
            console.error('Erro ao realizar a operação:', error);
            setErrorMessage('Erro ao realizar a operação. Tente novamente.');
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                <form onSubmit={updateFerramenta}>
                    <div className={styles.formGroup}>
                        {/* Muda o título dinamicamente entre edição e cadastro */}
                        <p className={styles.title}>{editId ? 'Editar Ferramenta' : 'Cadastro de Ferramentas'}</p>
                        <label htmlFor="nome" className={styles.label}>Nome:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="nome"
                            value={nome}  // O valor atual do input é controlado pelo estado 'nome'
                            onChange={(e) => setNome(e.target.value)} // Atualiza o estado quando o input muda
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="descricao" className={styles.label}>Descrição:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="descricao"
                            value={descricao}  // O valor atual do input é controlado pelo estado 'descricao'
                            onChange={(e) => setDescricao(e.target.value)} // Atualiza o estado quando o input muda
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="img" className={styles.label}>Imagem:</label>
                        <input
                            type="text"
                            className={styles.input}
                            id="img"
                            value={img}  // O valor atual do input é controlado pelo estado 'img'
                            onChange={(e) => setImg(e.target.value)} // Atualiza o estado quando o input muda
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`${styles.button} ${styles.submitButton}`}
                    >
                        {editId ? 'Atualizar' : 'Cadastrar'} {/* O texto do botão muda conforme a operação */}
                    </button>
                </form>

                {/* Mensagens de sucesso e erro */}
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default CadastroFerramentas;
