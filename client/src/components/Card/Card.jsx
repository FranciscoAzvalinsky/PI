import style from './Card.module.css'
import { Link } from 'react-router-dom';

export default function Card ({image, name, temperament, weight, id}) {
    return (
        <Link to={`/detail/${id}`}>
            <div className={style.divCard}>
                <img className={style.img} src={image} alt='FotoPerro'/>
                <h3 className={style.text}>{name}</h3>
                <h3 className={style.text}>{temperament}</h3>
                <h3 className={style.text}>{weight}</h3>
            </div>
        </Link>
    )
}