import axios from 'axios';
import style from './Detail.module.css';
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
 
export default function Detail (){
    const { id } = useParams()
    const [character, setCharacter] = useState({});

    console.log(id);

     useEffect(() => {
        axios(`http://localhost:3001/dogs/${id}`).then(
            ({data}) => {
                if (data.name) {
                    setCharacter(data);
                    console.log(character);
                } else {
                    window.alert('No hay personajes con ese ID');
                 }
              });
              return setCharacter({});
           }, [id]);

           if (character.name){
            return (
                <div className={style.divDetail}>
                    <Link to ='/home'>
                        <button type='button'>Back</button>
                    </Link>
                    <img className={style.img} src={character.reference_image_id}></img>
                    <p className={style.text}>{character.id}</p>
                    <p className={style.text}>{character.name}</p>
                    <p className={style.text}>{character.weight.metric}</p>
                    <p className={style.text}>{character.height.metric}</p>
                    <p className={style.text}>{character.temperament}</p>
                    <p className={style.text}>{character.life_span}</p> 
                </div>
            )
           }
}