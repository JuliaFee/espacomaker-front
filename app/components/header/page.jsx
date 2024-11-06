import { VscTools } from "react-icons/vsc";
import { LuCalendarDays } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlinePrinter } from "react-icons/hi2";
import styles from './header.module.css'; 

const Header = () => {
    return (
        <div className={styles.global}>
            <div className={styles.nav}>
                <a href="./"><img className={styles.logo} src="../../logoSenaiLab.png" alt="Logo" style={{width: "250px"}}/></a>
            </div>
            <div className={styles.tools}>
                <a href="./ferramentas"><VscTools className={styles.icon}/></a>
                <a href="./impressora"><HiOutlinePrinter className={styles.icon}/></a> 
                <a href="./login"><IoPersonOutline className={styles.icon}/></a> 
                <a href="./reserva"><LuCalendarDays className={styles.icon}/></a> 

              
            </div>
        </div>
    );
}

export default Header;
