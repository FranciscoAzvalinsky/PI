import axios from 'axios';
import validation from '../validation';
import style from './Form.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import Button from '../Button/Button';

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

    const handleImage = (e) => {
        const file = e.target.files[0];
        

        if (file && file.type.startsWith('image/')){
            console.log('llegue 1');
            const imageURL = URL.createObjectURL(file)
            setDogData({...dogData, reference_image_id: imageURL})
            console.log('llegue 2');

            const imgPreview = document.getElementById('image-preview');
            if (imgPreview){
                console.log('llegue 3');
                imgPreview.src=URL.createObjectURL(file);
                console.log('llegue 4');
            }
        } else {
            setDogData({...dogData, reference_image_id: ''})
            console.log('llegue 3');

            const imgPreview = document.getElementById('image-preview');
            if (imgPreview){
                imgPreview.src='';
            }
        }
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
                <Button text='Back to Home'></Button>
            </Link>
                <h3 className={style.text}>Crea una raza de perros!</h3>
                <div>
                    <label className={style.text} for='name'>Name: </label>
                    <input name='name' value={dogData.name} onChange={handleChange}></input>
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label className={style.text} for='weightMin'>Minimum weight: </label>
                    <input name='weightMin' value={dogData.weightMin} onChange={handleChange}></input>
                    {errors.weightMin && <p>{errors.weightMin}</p>}
                </div>
                <div>
                    <label className={style.text} for='weightMax'>Maximum weight: </label>
                    <input name='weightMax' value={dogData.weightMax} onChange={handleChange}></input>
                    {errors.weightMax && <p>{errors.weightMax}</p>}
                </div>
                <div>
                    <label className={style.text} for='heightMin'>Minimum height: </label>
                    <input name='heightMin' value={dogData.heightMin} onChange={handleChange}></input>
                    {errors.heightMin && <p>{errors.heightMin}</p>}
                </div>
                <div>
                    <label className={style.text} for='heightMax'>Maximum height: </label>
                    <input name='heightMax' value={dogData.heightMax} onChange={handleChange}></input>
                    {errors.heightMax && <p>{errors.heightMax}</p>}
                </div>
                <div>
                    <label className={style.text} for='life_span'>Life span: </label>
                    <input name='life_span' value={dogData.life_span} onChange={handleChange}></input>
                    {errors.life_span && <p>{errors.life_span}</p>}
                </div>
                <div>
                    <label className={style.text} for='temperament'>Temperament(s): </label>
                    <input name='temperament' value={temperaments} onChange={handleChange}></input>
                    {errors.temperament && <p>{errors.temperament}</p>}
                    
                    <Button text='Add' type='button' onClick={handleClick}></Button>
                </div>
                <div>
                    <label className={style.text} for="image">Image:</label>
                    <input type='file' name='image' id='image' accept='image/*' onChange={handleImage}></input>
                    {dogData.reference_image_id &&
                    <img id='image-preview' src={dogData.reference_image_id} alt='Vista previa' className={style.imgPreview}></img>}                
                </div>
                <hr></hr>
                <Button text='Crear' type='submit'></Button>
            </form>
        </div>
    )
}