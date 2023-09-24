import axios from 'axios';
import validation from '../validation';
import style from './Form.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

export default function Form ({createDog}) {
    const [dogData, setDogData]= useState({
        name: "",
        reference_image_id: '',
        weightMin:"",
        weightMax:"",
        heightMin:"",
        heightMax:"",
        life_span:"",
        temperament: [],
    });

    const [temperaments, setTemperaments]= useState('');


    const [errors, setErrors]= useState({});

    useEffect (() => {
        setErrors(validation({
            name : dogData.name,
            weightMin : dogData.weightMin,
            weightMax : dogData.weightMax,
            heightMin : dogData.heightMin,
            heightMax : dogData.heightMax,
            life_span : dogData.life_span,
            temperament : dogData.temperament,
        }));
    }, []);


    const handleChange = (e) => {
        if (e.target.name === 'temperament'){
           setTemperaments(e.target.value);
        }
        else {
            setDogData({
                ...dogData,
                [e.target.name]: e.target.value, 
                
            })
        }
        setErrors(validation({
            ...dogData,
            [e.target.name] : e.target.value,
        }));
    }

    const handleClick = (e) => {
        if (temperaments.trim() !== ''){
            setDogData({
                ...dogData,
                temperament: [...dogData.temperament, temperaments]
            })
            setTemperaments('');
        }
 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!errors.name && !errors.weightMin && !errors.weightMax && !errors.heightMin && !errors.heightMax && !errors.life_span && !errors.temperament){
            console.log('entre');
            await createDog(dogData);
            setDogData({
                name: "",
                reference_image_id:"",
                weightMin:"",
                weightMax:"",
                heightMin:"",
                heightMax:"",
                life_span:"",
                temperament: [],
            })
        }
        else {

        }

    }

    return (
        <div className={style.divDiv}>
            
            <form className={style.divDetail} onSubmit={handleSubmit}>
            <Link to='/home'>
                <button>Back to Home</button>
            </Link>
                <h3 className={style.text}>Crea una raza de perros!</h3>
                <div>
                    <label className={style.text} for='name'>Nombre: </label>
                    <input name='name' value={dogData.name} onChange={handleChange}></input>
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label className={style.text} for='weightMin'>Peso minimo:</label>
                    <input name='weightMin' value={dogData.weightMin} onChange={handleChange}></input>
                    {errors.weightMin && <p>{errors.weightMin}</p>}
                </div>
                <div>
                    <label className={style.text} for='weightMax'>Peso maximo:</label>
                    <input name='weightMax' value={dogData.weightMax} onChange={handleChange}></input>
                    {errors.weightMax && <p>{errors.weightMax}</p>}
                </div>
                <div>
                    <label className={style.text} for='heightMin'>Altura minima:</label>
                    <input name='heightMin' value={dogData.heightMin} onChange={handleChange}></input>
                    {errors.heightMin && <p>{errors.heightMin}</p>}
                </div>
                <div>
                    <label className={style.text} for='heightMax'>Altura maxima:</label>
                    <input name='heightMax' value={dogData.heightMax} onChange={handleChange}></input>
                    {errors.heightMax && <p>{errors.heightMax}</p>}
                </div>
                <div>
                    <label className={style.text} for='life_span'>Años de vida: </label>
                    <input name='life_span' value={dogData.life_span} onChange={handleChange}></input>
                    {errors.life_span && <p>{errors.life_span}</p>}
                </div>
                <div>
                    <label className={style.text} for='temperament'>Temperamento(s): </label>
                    <input name='temperament' value={temperaments} onChange={handleChange}></input>
                    {errors.temperament && <p>{errors.temperament}</p>}
                    <button type='button' onClick={handleClick}>Agregar</button>
                </div>
                <div>
                    <input type='file' name='reference_image_id' id='foto' accept='image/*' value={dogData.reference_image_id} onChange={handleChange}></input>
                    <label for='reference_image_id'></label>
                </div>
                <hr></hr>
                <button type = 'submit'>
                    <strong>Crear</strong>
                </button>
                
            </form>
        </div>
    )
}