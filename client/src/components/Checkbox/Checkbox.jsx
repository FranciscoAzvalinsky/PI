import style from './Checkbox.module.css'

export default function Checkbox({text, onClick, onChange}) {
    return <label className={style.materialCheckbox}>
                    <input type='checkbox' onClick={onClick} onChange={onChange}></input>
                    <span className={style.checkmark}></span>
                    {text}
                </label>
             
}