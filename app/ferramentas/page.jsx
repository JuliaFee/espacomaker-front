"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Ferramentas(){
    const[ferramentas,setFerramentas] = useState([]);
    const[descricao, setDescricao] =useState([]);
    const router = useRouter();

    useEffect(()=>{
        async function fetchFerramentas() {
            try{
                const response = await axios.get(`/api/ferramentas?nome${setFerramentas.nome}`);
                setFerramentas(response.data.data);
                setDescricao(response.data.data);
            }catch (error){
              console.error("Error fetching data:",error);
            
            }
           
}
fetchFerramentas();
}, []);
const handleFerramentas = (e) =>{

}

}
            
    
    

    
