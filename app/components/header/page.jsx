import { VscTools } from "react-icons/vsc";
import { CiCalendar } from "react-icons/ci";
import styles from './header.module.css'; 

const Header = () => {
    return (
        <div className={styles.global}>
            <div className={styles.nav}>
                <p><span className={styles.senai}>SENAI</span> <span className={styles.lab}>lab</span></p>
            </div>
            <div className={styles.tools}>
                <a href="#"><VscTools className={styles.icon}/></a>
                <a href="#"><CiCalendar className={styles.icon}/></a>
              
            </div>
        </div>
    );
}

export default Header;
