"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";


function Ferramentas() {
    const [ferramentas, setFerramentas] = useState([]);

    useEffect (() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/ferramentas");
                console.log('Dados recebidos da API:', response.data);
                setFerramentas(response.data);
            } catch (error) {
                console.error('Erro ao obter os dados da API:', error);
            }
        };
        fetchData();
        
    }, []);

    return (
        <div>
            <p>Ferramentas</p>
            <ul>
                {Array.isArray(ferramentas) && ferramentas.length > 0 ?(
                    ferramentas.map(ferramenta => (
                        <li key={ferramenta.id}>
                            {ferramenta.nome}
                            {ferramenta.descricao}
                            {ferramenta.img}
                        </li>
                    ))
                ) : (
                    <p>Nenhuma ferramenta encontrada</p>
                )}
            </ul>
        </div>
    )

}
  export default Ferramentas;          
    
    

    
