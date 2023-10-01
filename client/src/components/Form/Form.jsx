import axios from 'axios';
import validation from '../validation';
import style from './Form.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import Button from '../Button/Button';
import PopUp from '../PopUp/PopUp';

export default function Form ({createDog}) {


    const [popUp, setPopUp] = useState(false);
    const [firstLoad, setFirstLoad] = useState(false);

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
            reference_image_id: dogData.reference_image_id
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
        if (e.target.name === 'reference_image_id'){
            setErrors(validation({
                ...dogData,
                reference_image_id : dogData.reference_image_id,
            }));
        }
        else {
            setErrors(validation({
                ...dogData,
                [e.target.name] : e.target.value,
            }));
        }

    }

    useEffect(() => {
        handleChange({target: {name: 'temperament', value: null}})
        setFirstLoad(true)
    }, firstLoad)

    const handleImage = (e) => {
        const file = e.target.files[0];
        

        if (file && file.type.startsWith('image/')){
            const imageURL = URL.createObjectURL(file)
            setDogData({...dogData, reference_image_id: imageURL})
            const imgPreview = document.getElementById('image-preview');
            if (imgPreview){
                imgPreview.src=URL.createObjectURL(file);
            }
        } else {
            setDogData({...dogData, reference_image_id: ''})
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
           setPopUp(true);
        }
    }

    const closePopUp = () => {
        setPopUp(false);
    }

    return (
        <div className={style.divDiv}>
            {popUp && <PopUp text='Your creation is not valid. Please address the invalid fields.' onClick={closePopUp}></PopUp>}
            <form className={style.divDetail} onSubmit={handleSubmit}>
            <Link to='/home'>
                <Button text='Back to Home' marginTop='8px' font='Quicksand'></Button>
            </Link>
                <h3 className={style.title}>Create a dog's race!</h3>
                <div>
                    <label className={style.text} for='name'>Name: </label>
                    <input name='name' value={dogData.name} onChange={handleChange}></input>
                    {errors.name ? <p className={style.text} style={{color: 'red'}}>{errors.name}</p> : <p className={style.text} style={{color: 'rgb(28, 126, 9)'}}>Valid name</p>}
                </div>
                <div>
                    <label className={style.text} for='weightMin'>Minimum weight: </label>
                    <input name='weightMin' value={dogData.weightMin} onChange={handleChange}></input>
                    {errors.weightMin ? <p className={style.text} style={{color: 'red'}}>{errors.weightMin}</p> : <p className={style.text} style={{color: 'rgb(28, 126, 9)'}}>Valid minimum weight</p>}
                </div>
                <div>
                    <label className={style.text} for='weightMax'>Maximum weight: </label>
                    <input name='weightMax' value={dogData.weightMax} onChange={handleChange}></input>
                    {errors.weightMax ? <p className={style.text} style={{color: 'red'}}>{errors.weightMax}</p> : <p  className={style.text} style={{color: 'rgb(28, 126, 9)'}}>Valid maximum weight</p>}
                </div>
                <div>
                    <label className={style.text} for='heightMin'>Minimum height: </label>
                    <input name='heightMin' value={dogData.heightMin} onChange={handleChange}></input>
                    {errors.heightMin ? <p className={style.text} style={{color: 'red'}}>{errors.heightMin}</p> : <p className={style.text} style={{color: 'rgb(28, 126, 9)'}}>Valid minimum height</p>}
                </div>
                <div>
                    <label className={style.text} for='heightMax'>Maximum height: </label>
                    <input name='heightMax' value={dogData.heightMax} onChange={handleChange}></input>
                    {errors.heightMax ? <p className={style.text} style={{color: 'red'}}>{errors.heightMax}</p> : <p className={style.text} style={{color: 'rgb(28, 126, 9)'}}>Valid maximum height</p>}
                </div>
                <div>
                    <label className={style.text} for='life_span'>Life span: </label>
                    <input name='life_span' value={dogData.life_span} onChange={handleChange}></input>
                    {errors.life_span ? <p className={style.text} style={{color: 'red'}}>{errors.life_span}</p> : <p className={style.text} style={{color: 'rgb(28, 126, 9)'}}>Valid life span</p>}
                </div>
                <div>
                    <label className={style.text} for='temperament'>Temperament(s): </label>
                    <input name='temperament' value={temperaments} onChange={handleChange} className={style.input}></input>
                    <Button text='Add' type='button' onClick={handleClick} font='Quicksand'></Button>
                    {errors.temperament ? <p className={style.text} style={{color: 'red'}}>{errors.temperament}</p> : <p className={style.text} style={{color: 'rgb(28, 126, 9)'}}>Valid temperament(s)</p>}
                </div>
                <div>
                    <label className={style.text} for="image">Image:</label>
                    <input type='file' name='reference_image_id' id='image' accept='image/*' onChange={handleImage}></input>
                    {!dogData.reference_image_id && <p className={style.text} style={{color: 'red'}}>{errors.reference_image_id}</p>}
                    {dogData.reference_image_id &&
                    <img id='image-preview' src={dogData.reference_image_id} alt='Vista previa' className={style.imgPreview}></img>}                
                </div>
                <Button text='Create' type='submit' font='Quicksand'></Button>
            </form>
        </div>
    )
}