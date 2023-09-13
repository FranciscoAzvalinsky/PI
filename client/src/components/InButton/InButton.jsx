import style from './InButton.module.css'

export default function InButton () {
    return (
        <div className={style.box1}>
            <div className={`${style.btn} ${style.btnOne}`}>
                <span>Ingresar</span>
            </div>
        </div>
    )
}