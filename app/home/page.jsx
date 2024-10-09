"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import style from "./home.module.css";

const Home = () => {
  const [ferramentas, setFerramentas] = useState([]);
  const [deviceType, setDeviceType] = useState("");

  const getDeviceType = () => {
    const userAgent = navigator.userAgent;

    if (
      /android/i.test(userAgent) ||
      (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
    ) {
      return "Mobile";
    } else {
      return "Desktop";
    }
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
    async function fetchFerramentas() {
      try {
        console.log("pegando ferramentas");
        const response = await axios.get("/api/ferramentas");
        console.log("Response:", response);
        setFerramentas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchFerramentas();
  }, []);

  return (
    <div className={style.body}>
      <h1>Hello World !!!</h1>
      <h3>{deviceType}</h3>
      <ul>
        {ferramentas.map((ferramenta, index) => (
          <li key={index}>{ferramenta.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;