"use client";

import React, { useEffect } from "react";
import style from "./home.module.css";

const Home = () => {
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

    return () => {
      document.body.classList.remove(deviceType);
    };
  }, []);

  return (
    <div className={style.body}>
      <h1>Hello World !!!</h1>
      <h3>{getDeviceType()}</h3>
    </div>
  );
};

export default Home;
