import style from './Paginador.module.css'
import Card from '../Card/Card'
import Button from '../Button/Button';
import { connect, useDispatch } from "react-redux";

import { useEffect } from 'react';
import { nextHandler, prevHandler, firstRender } from '../../redux/actions';

function Paginador ({dogs, currentPage, showing, nextHandler, prevHandler}) {  

    const itemsPerPage = 8;

    const dispatch = useDispatch()
  
    useEffect (() => {
        dispatch(firstRender(dogs, itemsPerPage, currentPage));
      }, [dogs])

      const prev = () => {
        dispatch(prevHandler(dogs, itemsPerPage, currentPage))
      }

      const next = () => {
        dispatch(nextHandler(dogs, itemsPerPage, currentPage))
      }

    let items = [];

        items = showing.map ((dog) => {
            return (
                    <li key={dog.id} className={style.FlexLi}>
                        <Card 
                            image={dog.reference_image_id} 
                            name={dog.name} 
                            temperament={dog.temperament}
                            temperaments={dog?.temperaments} 
                            weight={dog.weight.metric} 
                            id={dog.id}>
                        </Card>
                    </li>
            )
        })

            return (
                <div>
                    <h3 className={style.h3} style={{marginTop:'20px'}}>Page {currentPage+1}/{Math.floor(dogs.length/itemsPerPage)+1}</h3>
                    <h3 className={style.h3} style={{marginTop:'-20px', marginBottom: '5px'}}> 
                        <div className={style.buttonDiv}>
                            <Button text='e' onClick={prev} marginRight='20px' font='Arrow' rotate='180'></Button>
                            {dogs.length} results
                            <Button text='e' onClick={next} marginLeft='20px' font='Arrow'></Button>
                        </div>
                    </h3>
                    <ul className={style.FlexContainer}>{items}</ul>
                    
                </div>
            )
}


const mapStateToProps = (state) => {
    return {
        dogs: state.dogs,
        showing: state.showing,
        currentPage: state.currentPage,
    }
 }
 
 function mapDispatchToProps (dispatch){
    return {
       nextHandler: (dogs, itemsPerPage, currentPage) => dispatch(nextHandler(dogs, itemsPerPage, currentPage)),
       prevHandler: (dogs, itemsPerPage, currentPage) => dispatch(prevHandler(dogs, itemsPerPage, currentPage)),
    }
 }
 
 export default connect (mapStateToProps, mapDispatchToProps)(Paginador);