import style from './Button.module.css'

export default function Button ({text, type, onClick, value, marginRight, marginLeft}){
    return(
        <div>
            <button className={style.cssButtonRetroSand} value={value} type={type} onClick={onClick} style={{marginRight: marginRight, marginLeft: marginLeft}}> {text} </button>
        </div>
    );
}