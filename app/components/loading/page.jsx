import style from "./loading.module.css";

const Loading = () => {
    return (
        <div className={style.global}>
            <img className={style.img} src="../../loading2.gif"></img>
        </div>
    )
}
export default Loading;