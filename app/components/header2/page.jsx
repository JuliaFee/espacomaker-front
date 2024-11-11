import styles from './header2.module.css'; 

const Header2 = () => {
    return (
        <div className={styles.global}>
            <div className={styles.nav}>
                <a href="./"><img className={styles.logo} src="../../logoSenaiLab.png" alt="Logo" style={{width: "240px"}}/></a>

            </div>
            <div className={styles.tools}>
                
            <div className={styles.escrito}>
                <img src="../../LOGO2.png" alt="inova" style={{width: "125px"}}/>
            </div>
              
            </div>
        </div>
    );
}

export default Header2;
