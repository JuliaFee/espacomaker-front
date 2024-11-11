import style from "./footer.module.css";
// import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <div className={style.global}>
            <div className={style.container}>
            <a href="./"><img className={style.logo} src="../../logoSenaiLab.png" alt="Logo" style={{width: "200px"}}/></a>
        

            </div>
            <div className={style.escrito}>
                <p> ©Todos os Direitos Reservados - 2024 by <a url="#"><img src="../../LOGO2.png" alt="inova" style={{width: "50px"}}/></a></p>
            </div>
        </div>
    )
}
export default Footer;