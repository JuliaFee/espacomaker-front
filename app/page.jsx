"use client";
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Header from "./components/header/page";
import Footer from "./components/footer/page";

const Carousel = () => {
  const images = [
    '/img1.jpeg',
    '/img2.jpeg',
    '/img3.jpeg',
    '/img4.jpeg',
    '/img5.jpeg',
    '/img6.jpeg',
  ]; 

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage();
    }, 2000); 
    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className={styles.page}>
      <Header /> 
      <h1 className={styles.h1}>CONHEÇA O ESPAÇO MAKER</h1>
      <div className={styles.carouselContainer}>
        <div className={styles.imageContainer}>
          <img
            src={images[currentIndex]}
            alt={`Imagem ${currentIndex + 1}`}
            className={styles.carouselImage}
          />
        </div>
      </div>

      <div className={styles.navDots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
            onClick={() => setCurrentIndex(index)} 
          ></span>
        ))}
      </div>

      <Footer /> 
    </div>
  );
};

export default Carousel;
