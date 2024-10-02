import styles from "./administracao.module.css"
import Link from "next/link";
import Header from "./../components/header/page.jsx";
import Footer from "./../components/footer/page.jsx";


export default function Administracao() {
  return (
    <div className={styles.page}>
      
      <Header></Header> 
      <div className={styles.imagecontainer}>
        <img className={styles.img} src="bannerSM.png"></img>
      </div>
      <div className={styles.section1}>
        <div className={styles.title2}>
         <p className={styles.title2}>Controle de serviços</p>
         </div>

         <div className={styles.linkSection}> 

          <div className="reserva-section">
            <div className="reserva-content">
            <Link className={styles.link} href={""}>Controlar reservas</Link>

            </div>
            <div className="reserva-image">
              <img src="reserva.png" alt="Ferramentas"></img>
            </div>

       </div>
      
          
          <Link className={styles.link} href={"./controlar-andamentos/page.jsx"}>Controlar andamentos </Link>
         </div>
         <div className={styles.linkSection}>
          
         </div>

      </div>



  
      <Footer></Footer>
    </div>
  );
}
