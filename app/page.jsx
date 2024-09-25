import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* <Header></Header> */}
      <div className={styles.section0}>
        <div className={styles.title}>
          <p>SENAI Lab</p>
        </div>
      </div>

      <div className={styles.imagecontainer}>
        <img className={styles.img} src="bannerSM.png"></img>
      </div>
      <div className={styles.section1}>
        <div className={styles.title2}>
         <p>Serviços</p>
         </div>
         <div className={styles.linkSection}>
          <Link className={styles.link} href={""}>Realizar Reserva</Link>
          <Link className={styles.link} href={""}>Acompanhar Andamento</Link>
         </div>
      </div>



  
      {/* <footer className={styles.footer}></footer> */}
    </div>
  );
}
