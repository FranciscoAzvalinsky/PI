import style from './Button.module.css'

export default function Button ({text, type, onClick, value, marginRight, marginLeft, marginTop}){
    return(
        <div>
            <button value={value} type={type} onClick={onClick} style={{marginRight: marginRight, marginLeft: marginLeft, marginTop: marginTop}}> {text} </button>
        </div>
    );
}