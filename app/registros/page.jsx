import styles from "./registro.module.css";
import Link from "next/link";
// import Header from "./components/header/page";
// import Footer from "./components/footer/page";


export default function Registros() {
  return (
    <div className={styles.page}>
      
      {/* <Header></Header>  */}
     
      <div className={styles.section1}>
        <div className={styles.title2}>
         <p className={styles.title2}>REGISTRO</p>
         </div>

         <div className={styles.linkSection}> 

          <div className="reserva-section">
            <div className="reserva-content">
            <Link className={styles.link} href={""}>Faça o registro de docentes</Link>

            </div>
            <div className={styles.inputs}>
                <input type="text" placeholder="Nome"/>
                <input type="text" placeholder="Email"/>
                <input type="text" placeholder="Senha"/>
            </div>
            <div><button className={styles.button}>Registrar</button></div>

       </div>
      
        
          
         </div>

      </div>



  
      {/* <Footer></Footer> */}
    </div>
  );
}
