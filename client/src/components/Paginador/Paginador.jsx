import style from './Paginador.module.css'
import Card from '../Card/Card'
import { Link } from 'react-router-dom'

export default function Paginador ({currentPage, prevHandler, nextHandler, dogs, home}) {  
    let items = [];

        items = dogs.map ((dog) => {
            console.log(dog);
            return (
                    <li key={dog.id} className={style.FlexLi}>
                        <Card 
                            image={dog.reference_image_id} 
                            name={dog.name} 
                            temperament={dog.temperament} 
                            weight={dog.weight.metric} 
                            id={dog.id}>
                        </Card>
                    </li>
            )
        })
 
        if (home){
            return (
                <div>
                    
                    <h2>Pagina {currentPage + 1}</h2>
                    <button onClick={prevHandler}>Prev</button>
                    <button onClick={nextHandler}>Next</button>
                    <ul className={style.FlexContainer}>{items}</ul>
                </div>
            )
        } else {
            return (
                <div>
                    <Link to = '/home'>
                        <button>
                            <strong>Back</strong>
                        </button>
                    </Link>
                    <ul className={style.FlexContainer}>{items}</ul>
                </div>
            )
        }
    
}