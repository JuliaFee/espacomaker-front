import styles from "./page.module.css";
import Link from "next/link";
import Header from "./../components/header/page";
import Footer from "./../components/footer/page";


export default function Home() {
  return (
    <div className={styles.page}>

      <Header></Header>
      <div className={styles.imagecontainer}>
        <img className={styles.imgBanner} src="bannerSM.png"></img>
      </div>
      <div className={styles.section1}>
        <div className={styles.title2}>
          <p className={styles.title2}> CONTROLE DE SERVIÇOS</p>
        </div>

        <div className={styles.linkSection}>

          <div className="reserva-section">
            <div className="reserva-content">
              <div className={styles.card-1}>
              <Link className={styles.link} href={""}>CONTROLE DE RESERVAS</Link>
              <img className={styles.img1} src="reserva.png" alt="Ferramentas" />
              </div>
            </div>
          </div>
          <div className="reserva-content">
            <Link className={styles.link} href={""}>CONTROLAR ANDAMENTOS</Link>
            <img className={styles.img2} src="reserva.png" alt="Ferramentas" />
          </div>
          
        </div>
        <div className={styles.linkSection}>

        </div>

      </div>




      <Footer></Footer>
    </div>
  );
}

