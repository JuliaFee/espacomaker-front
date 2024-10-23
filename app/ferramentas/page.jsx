"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./pageferramentas.module.css";
import { useRouter } from 'next/navigation'; // Adicionando o hook para redirecionar

const Ferramentas = () => {
  const [ferramentas, setFerramentas] = useState([]);
  const [deviceType, setDeviceType] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Para redirecionar o usuário

  const getDeviceType = () => {
    const userAgent = navigator.userAgent;
    return /android/i.test(userAgent) || (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) ? "Mobile" : "Desktop";
  };

  useEffect(() => {
    const deviceType = getDeviceType();
    document.body.classList.add(deviceType);
    setDeviceType(deviceType);
    return () => {
      document.body.classList.remove(deviceType);
    };
  }, []);

  useEffect(() => {
    const fetchFerramentas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/ferramentas");
        if (response.data && Array.isArray(response.data.ferramentas)) {
          setFerramentas(response.data.ferramentas);
        } else {
          setError("Formato de dados inesperado!");
        }
      } catch (error) {
        setError("Erro interno do servidor!");
      } finally {
        setLoading(false);
      }
    };
    fetchFerramentas();
  }, []);

  // Função para excluir uma ferramenta
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/ferramentas/${id}`);
      setFerramentas(ferramentas.filter((ferramenta) => ferramenta.id !== id)); // Remove da lista sem recarregar
    } catch (error) {
      setError("Erro ao excluir a ferramenta. Tente novamente.");
    }
  };

  // Função para redirecionar para a página de edição
  const handleEdit = (id) => {
    router.push(`/ferramentas/cadastro-ferramentas?id=${id}`); // Redireciona para a página de edição com o ID da ferramenta
  };

  return (
    <div className={style.body}>
      <h1>Ferramentas Disponíveis</h1>
      <h3>Tipo de dispositivo: {deviceType}</h3>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {error && <p className={style.error}>{error}</p>}
          <ul>
            {ferramentas.length > 0 ? (
              ferramentas.map((ferramenta) => (
                <li key={ferramenta.id} className={style.card}>
                  <img src={ferramenta.img} alt={ferramenta.nome} className={style.imagem} />
                  <h2>{ferramenta.nome}</h2>
                  <p>{ferramenta.descricao}</p>
                  <button onClick={() => handleEdit(ferramenta.id)} className={style.editButton}>Editar</button>
                  <button onClick={() => handleDelete(ferramenta.id)} className={style.deleteButton}>Excluir</button>
                </li>
              ))
            ) : (
              <li>Nenhuma ferramenta encontrada.</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Ferramentas;
