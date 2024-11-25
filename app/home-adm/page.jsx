import styles from "./homeadm.module.css";
import Link from "next/link";
import Header from "../components/header/page";
import Footer from "../components/footer/page";


export default function Home_adm() {
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
            <Link className={styles.link2} href={"./reserva/reserva-lista"}>ADMNISTRAR RESERVAS</Link>
          
          </div>


          <div className="reservaContent">
            <Link className={styles.link2} href={"./ferramentas/cadastro-ferramentas"}>CADASTRAR FERRAMENTAS</Link>
            <img className={styles.img1} src="controlar_andamentos.png" alt="Ferramentas" />
          </div>

          <div className="reservaContent">
            <Link className={styles.link2} href={"./impressora/cadastro-impressora"}>CADASTRAR IMPRESSORA</Link>
            <img className={styles.img2} src="reserva.png" alt="Ferramentas" />
          </div>
        
        </div>

      </div>


      </div>

      <Footer></Footer>
    </div>
    
  );
}

