"use client"
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';  
import Header from "./components/header/page";
import Footer from "./components/footer/page";

export default function Home() {
  const router = useRouter(); 

  const handleUserClick = () => {
    localStorage.setItem("tipoUsuario", "user");
    router.push("/login"); 
  };

  const handleAdminClick = () => {
    localStorage.setItem("tipoUsuario", "adm");
    router.push("/login"); 
  };

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.imagecontainer}>
        <div className={styles.linkSection}>
          <div className="reservaContent">
            <button className={styles.link2} onClick={handleUserClick}>
              SOU USUÁRIO
            </button>
            <img className={styles.img1} src="controlar_andamentos.png" alt="Ferramentas" />
          </div>

          <div className="reservaContent">
            <button className={styles.link2} onClick={handleAdminClick}>
              SOU ADMINISTRADOR
            </button>
            <img className={styles.img2} src="reserva.png" alt="Ferramentas" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
