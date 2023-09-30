import axios from 'axios';
import style from './Detail.module.css';
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

import Button from '../Button/Button';
 
export default function Detail () {
    const { id } = useParams()
    const [character, setCharacter] = useState({});

     useEffect(() => {
        axios(`http://localhost:3001/dogs/${id}`).then(
            ({data}) => {
                if (data.name) {
                    setCharacter(data);
                } else {
                    window.alert('No hay personajes con ese ID');
                 }
              });
              return setCharacter({});
           }, [id]);

           let mapeado = [];
           if (character.temperaments){
                for (let i = 0; i< character.temperaments.length; i++) {
                    if (i === 0){
                        mapeado.push(character.temperaments[i].nombre)
                    }
                    else {
                        mapeado.push(', ' + character.temperaments[i].nombre)
                    }
                }
           }

           if (character.name){
            return (
                <div className={style.divDetail}>
                    <img className={style.img} src={character.reference_image_id} alt='Foto del perro'></img>
                    <p className={style.text}  style={{fontSize: '14px'}}>Id: {character.id}</p>
                    <p className={style.text} style={{fontSize: '20px', fontWeight: 'bold'}}>{character.name}</p>
                    <p className={style.text}>Weigth: {character.weight.metric} kg</p>
                    <p className={style.text}>Height: {character.height.metric} m</p>
                    {character.temperaments ? <p className={style.text}>{mapeado}</p> : <p className={style.text}>{character.temperament}</p>}
                    <p className={style.text}>Lifespan: {character.life_span}</p> 
                    <Link to ='/home'>
                        <Button type='button' text='Back to Home' font='Quicksand'></Button>
                    </Link>
                </div>
            )
           }
}