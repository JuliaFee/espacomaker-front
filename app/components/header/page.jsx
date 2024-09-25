import { VscTools } from "react-icons/vsc";
import { CiCalendar } from "react-icons/ci";
import styles from './header.modules.css'; 
const Header = () => {
    return (
        <>
        <div className={styles.global}>
            <div className={styles.nav}>
                <p>SENAI Lab</p>
              </div>
            <div className={styles.tools}>
                    <a href="#"><VscTools/></a>
                    <a href="#"><CiCalendar/></a>


                </div>
        </div>
        </>
    );
}
export default Header;