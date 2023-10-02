import style from './Button.module.css'

export default function Button ({text, type, onClick, value, marginRight, marginLeft, marginTop, font, rotate}){
    return(
        <div>
            <button className={style.button} value={value} type={type} onClick={onClick} style={{marginRight: marginRight, marginLeft: marginLeft, marginTop: marginTop, fontFamily: font, transform: `rotate(${rotate}deg)`}}> {text} </button>
        </div>
    );
}