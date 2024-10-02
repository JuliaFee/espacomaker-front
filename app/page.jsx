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

          <div className="reserva-section">
            <div className="reserva-container">
              <Link className={styles.link} href={""}>Realizar Reserva</Link>
              <img className={styles.imgUm} src="reserva.png" alt="Ferramentas"></img>
            </div>

          </div>
          <div className="reserva-section">
            <div className="reserva-container">
              <Link className={styles.link} href={""}>Acompanhar Andamento</Link>
              <img className={styles.imgDois} src="impressao3D.png" alt="Ferramentas"></img>
            </div>

          </div>
          <div className="reserva-section">
            <div className="reserva-container">
              <Link className={styles.link} href={"./ferramentas/"}>Ferramentas</Link>
              <img className={styles.imgTres} src="seletaTools.png" alt="Ferramentas"></img>
            </div>

          </div>
        </div>
        <div className={styles.linkSection}>

        </div>

      </div>




      <Footer></Footer>
    </div>
  );
}
