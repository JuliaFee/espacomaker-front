import React, { useEffect } from 'react';
import styles from './PopUp.module.css';

const PopUp = ({ message, typeColor, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const colorStyle = typeColor === 'sucesso' ? styles.sucesso : styles.erro;

    return (
        <div className={colorStyle}>
            <p>{message}</p>
        </div>
    );
};

export default PopUp;
