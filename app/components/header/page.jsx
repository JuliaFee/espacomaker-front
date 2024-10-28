import { VscTools } from "react-icons/vsc";
import { LuCalendarDays } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlinePrinter } from "react-icons/hi2";
import styles from './header.module.css'; 

const Header = () => {
    return (
        <div className={styles.global}>
            <div className={styles.nav}>
                <p><span className={styles.senai}>SENAI</span> <span className={styles.lab}>lab</span></p>
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
