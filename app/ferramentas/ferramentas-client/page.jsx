"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Header_client from "../../components/header-client/page";
import Footer from "../../components/footer/page";
import style from "./ferramentaclient.module.css";
import { IoCaretBack } from "react-icons/io5";
// import { MdOutlineDelete } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

const Ferramentas_client = () => {
  const [ferramentas, setFerramentas] = useState([]);
  const [ferramentasFiltradas, setFerramentasFiltradas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [user, setUser ] = useState({ tipo: 'user' }); //fica por padrao como user
  const router = useRouter(); 

//fetch
  useEffect(() => {
    const fetchFerramentas = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/ferramentas`);
        if (response.data && Array.isArray(response.data.ferramentas)) {
          setFerramentas(response.data.ferramentas);
          setFerramentasFiltradas(response.data.ferramentas); 
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
// pega o tipo do user pelo local storage
useEffect(() => {
  const userType = localStorage.getItem('user.tipo');
  if (userType) {
    setUser ({ tipo: user.tipo }); 
  }
}, []);
  // //delete
  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/ferramentas/${id}`);
  //     setFerramentas(ferramentas.filter((ferramenta) => ferramenta.id !== id)); 
  //     setFerramentasFiltradas(ferramentasFiltradas.filter((ferramenta) => ferramenta.id !== id));
  //   } catch (error) {
  //     setError("Erro ao excluir a ferramenta. Tente novamente.");
  //   }
  // };

  // //edit
  // const handleEdit = (id) => {
  //   router.push(`/ferramentas/cadastro-ferramentas?id=${id}`); 
  // };

  //filtro
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);


    const filteredTools = ferramentas.filter((ferramenta) =>
      ferramenta.nome.toLowerCase().includes(searchValue)
    );
    setFerramentasFiltradas(filteredTools);
  };

  //html 
  return (
    //filtro do rogerio/adm vvvvvv
   // { user.tipo === 'adm' ? (/* rogerio ou outro adm q tem acesso as coisa */) : (/*tudo nada*/) };
    <div className={style.body}>
      <Header_client />
      <Link href={"../"} className={style.back}><IoCaretBack /></Link>
      <h1 className={style.h1}>Ferramentas Disponíveis</h1>
      
      <div className={style.search}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Busque aqui..."
        className={style.searchInput}
        
      />
      </div>
      

      {loading ? (
        <p className={style.loading}>Carregando...</p>
      ) : (
        <>
          {error && <p className={style.error}>{error}</p>}
          <ul className={style.container}>
            {ferramentasFiltradas.length > 0 ? (
              ferramentasFiltradas.map((ferramenta) => (
                <li key={ferramenta.id} className={style.card}>
                  <img src={ferramenta.img} alt={ferramenta.nome} className={style.imagem} />
                  <h2 className={style.subtitle}>{ferramenta.nome}</h2>
                  <p className={style.description}>{ferramenta.descricao}</p>
                  {/* <button onClick={() => handleEdit(ferramenta.id)} className={style.editButton}><FaRegEdit /></button>
                  <button onClick={() => handleDelete(ferramenta.id)} className={style.deleteButton}><MdOutlineDelete /></button> */}
                   <a href={`../../reserva-ferramentas`} className={style.agendarButton}>
                    <LuCalendarDays />
                  </a>
                </li>
              ))
            ) : (
              <li>Nenhuma ferramenta encontrada.</li>
            )}
          </ul>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Ferramentas_client;
