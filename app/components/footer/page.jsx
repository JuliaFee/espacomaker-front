import style from "./footer.module.css";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <div className={style.global}>
            <div className={style.container}>
                <a href='https://www.instagram.com/senaivalinhos/'><FaInstagram /></a>
               
            </div>
            <div>

            </div>
            <div className={style.escrito}>
                <p> ©Todos os Direitos Reservados - 2024 <span className={style.span}>By Inova Tech</span></p>
            </div>
        </div>
    )
}
export default Footer;