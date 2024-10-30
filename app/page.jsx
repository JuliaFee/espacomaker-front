import styles from "./page.module.css";
import Link from "next/link";
import Header from "./components/header/page";
import Footer from "./components/footer/page";


export default function Home() {
  return (
    <div className={styles.page}>

      <Header></Header>
      <div className={styles.imagecontainer}>
        <img className={styles.imgBanner} src="bannerSM.png"></img>
      </div>
      <div className={styles.section1}>
        <div className={styles.title2}>
          <p className={styles.link}>SERVIÇOS</p>
        </div>

        <div className={styles.linkSection}>

          <div className="reservaContent">
            <Link className={styles.link2} href={"./reserva"}>REALIZAR RESERVA</Link>
            <img className={styles.img1} src="controlar_andamentos.png" alt="Ferramentas" />
          </div>

          <div className="reservaContent">
            <Link className={styles.link2} href={"./andamento"}>ACOMPANHAR ANDAMENTO</Link>
            <img className={styles.img2} src="reserva.png" alt="Ferramentas" />
          </div>
        
        </div>

      </div>




      <Footer></Footer>
    </div>
  );
}

