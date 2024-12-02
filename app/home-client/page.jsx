import styles from "./homeclient.module.css";
import Link from "next/link";
import Header from "../components/header-client/page";
import Footer from "../components/footer/page";


export default function Home_client() {
  return (
    <div className={styles.page}>

      <Header></Header>
      <div className={styles.block}>
      <div className={styles.brick}>
      <div className={styles.imagecontainer}>
        <img className={styles.imgBanner} src="CARTAZ.png"></img>
      </div>
      </div>
      <div className={styles.section1}>
        <div className={styles.title2}>
          <p className={styles.link}>SERVIÇOS</p>
        </div>

        <div className={styles.linkSection}>

          <div className="reservaContent">
            <Link className={styles.link2} href={"./ferramentas/ferramentas-client"}>FERRAMENTAS</Link>
            <img className={styles.img1} src="controlar_andamentos.png" alt="Ferramentas" />
          </div>

          <div className="reservaContent">
            <Link className={styles.link2} href={"./impressora/impressora-client"}>IMPRESSORAS 3D</Link>
            <img className={styles.img2} src="reserva.png" alt="Ferramentas" />
          </div>
        
        </div>

      </div>


      </div>

      <Footer></Footer>
    </div>
  );
}

