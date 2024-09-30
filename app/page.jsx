import styles from "./page.module.css";
import Link from "next/link";
import Header from "./components/header/page";
import Footer from "./components/footer/page";


export default function Home() {
  return (
    <div className={styles.page}>
      
      <Header></Header> 
      <div className={styles.imagecontainer}>
        <img className={styles.img} src="bannerSM.png"></img>
      </div>
      <div className={styles.section1}>
        <div className={styles.title2}>
         <p className={styles.title2}>SERVIÇOS</p>
         </div>

         <div className={styles.linkSection}> 
<<<<<<< HEAD
          <div className="reserva-section">
            <div className="reserva-content">
            <Link className={styles.link} href={""}>Realizar Reserva</Link>
=======
          <div class="reserva-section">
            <div class="reserva-content">
            <Link className={styles.link} href={"./reservas/reserva"}>Realizar Reserva</Link>
>>>>>>> 648f8088515e93c9775c643c5000e6cc34202a30
            </div>
            <div className="reserva-image">
              <img src="reserva.png" alt="Ferramentas"></img>
            </div>

       </div>
      
          
          <Link className={styles.link} href={""}>Acompanhar Andamento</Link>
          <Link className={styles.link} href={"./ferramentas/"}>Ferramentas</Link>
         </div>
         <div className={styles.linkSection}>
          
         </div>

      </div>



  
      <Footer></Footer>
    </div>
  );
}
