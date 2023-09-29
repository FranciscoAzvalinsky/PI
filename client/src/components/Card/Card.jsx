import style from './Card.module.css'
import { Link } from 'react-router-dom';

export default function Card ({image, name, temperament, temperaments, weight, id}) {
    let mapeado = [];
    if (temperaments) {
        for (let i = 0; i< temperaments.length; i++) {
            if (i === 0){
                mapeado.push(temperaments[i].nombre)
            }
            else {
                mapeado.push(', ' + temperaments[i].nombre)
            }
        }
    }

    return (
        <Link to={`/detail/${id}`} className={style.link}>
            <div className={style.divCard}>
                <img className={style.img} src={image} alt='FotoPerro'/>
                <h3 className={style.text}>{name}</h3>
                {temperaments ? <h3 className={style.text}>{mapeado}</h3> : <h3 className={style.text}>{temperament}</h3>}
                <h3 className={style.text}>{weight}</h3>
            </div>
        </Link>
    )
}