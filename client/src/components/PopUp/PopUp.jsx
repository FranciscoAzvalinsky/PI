import style from './PopUp.module.css'

export default function PopUp ({text, onClick}) {
    return (
        <div className={style.modal}>
            <div className={style.contenedor}>
                <header>
                    Read this
                </header>
                <label onClick={onClick}>x</label>
                <div className={style.contenido}>
                    {text}
                </div>
            </div>
        </div>
    )
}