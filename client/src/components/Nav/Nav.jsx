import style from './Nav.module.css'
import SearchBar from '../SearchBar/SearchBar';

import { Link, useLocation } from 'react-router-dom';
import { connect, useDispatch  } from "react-redux";

import Checkbox from '../Checkbox/Checkbox';
import Button from '../Button/Button';

import { originOfDogs, filterTemperaments, orderByType, orderWay, order, resetFilter, loadFilterTemperaments, unreset, deleteFilterTemp } from '../../redux/actions';

function Nav ({SearchByName, temperaments, filteredTemperaments}) {

    let location = useLocation();

    let items = [];

    //mapeo de los temperamentos del estado de redux para su display en el select
    items = temperaments.map ((temper) => {
        return (
                <option value={temper}>{temper}</option>
        )
    })

    const dispatch = useDispatch();

    //handler que permite cambiar entre api y bdd
    const handlerOrigin = (e) => {
        dispatch(originOfDogs(e.target.value));
        dispatch(order())
    }


    //handler que permite filtrar por temperamentos
    const handlerTemperaments = (e) => {
        dispatch(loadFilterTemperaments(e.target.value))
        dispatch(filterTemperaments());
        dispatch(order())
    }

    //handler que permite ordenar por peso o raza
    const handlerType = (e) => {
        dispatch(orderByType(e.target.value));
        dispatch(order())

    }

    //handler que permite ordenar ascendentemente o descendentemente
    const handlerOrder = (e) => {
        dispatch(orderWay(e.target.value));
        dispatch(order())
    }

    //funcion para resetear los filtros y mostrar el orden default
    const reseter = (e) => {
        if (e.target.checked) {
            dispatch(resetFilter())
            dispatch(filterTemperaments());
            dispatch(order());
        }
        else {
            dispatch(unreset())
            dispatch(filterTemperaments());
            dispatch(order());
        }
    }

    //elminar un temperamento del listado del filtrado
    const handleDeleteElement = (index) => {
        dispatch(deleteFilterTemp(index))
        dispatch(filterTemperaments());
        dispatch(order());
    }

    return (
        <div>
            {location.pathname === '/home' && 
            <div className={style.divDiv}>
            <SearchBar SearchByName={SearchByName}></SearchBar>
            <Link to='/createDog'>
                <Button text="Create your own dog's race!" font='Quicksand'></Button>
            </Link>
            <h3 className={style.label}>
                DOGS
            </h3>
            <h3 className={style.patita}>T</h3>
            <div className={style.divSelect}>
                <select onChange={handlerOrigin} className={style.select}>
                    <option value='Api'>API</option>
                    <option value='Bdd'>BDD</option>                       
                </select>
                <select onChange={handlerTemperaments} className={style.select}>
                    <option value='All temperaments'>All temperaments</option>
                    {items}
                </select>
                <div className={style.divTemps}>
                    <ul className={style.ulTemps}>
                        {filteredTemperaments.map((temper, index) => (
                            <li className={style.li} key={index}>{temper} <button style={{borderRadius: '5px'}}onClick={() => handleDeleteElement(index)}>
                                <span className={style.iconWrapper}>
                                    <svg class="icon" width="18px" height="18px" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </span>
                                </button></li>
                        ))}
                    </ul>
                </div>
                <select onChange={handlerType} className={style.select}>
                    <option value='raza'>Race</option>
                    <option value='peso'>Weight</option>
                </select>
                <select onChange={handlerOrder} className={style.select}>
                    <option value='A'>Ascending </option> 
                    <option value='D'>Descending</option>                                          
                </select>
            <Checkbox text='Default values' onChange={reseter}></Checkbox>
            </div>
            </div>            
            }
            {location.pathname === '/createDog' && 
            <div className={style.divDiv}>
                <h3 className={style.label} style={{marginLeft: '880px'}}>
                    DOGS
                </h3>
                <h3 className={style.patita}>T</h3>
             </div>}
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
       showing: state.showing,
       temperaments: state.temperaments,
       filteredTemperaments: state.filteredTemperaments,
    }
 }
 
 function mapDispatchToProps (dispatch){
    return {
        originOfDogs: (value) => dispatch(originOfDogs(value)),
        loadFilterTemperaments: (value) => dispatch(loadFilterTemperaments(value)),
        filterTemperaments: (value) => dispatch(filterTemperaments(value)),
        orderByType: (value) => dispatch(orderByType(value)),
        orderWay: (value) => dispatch(orderWay(value)),
        order: () => dispatch(order()),
        resetFilter: () => dispatch(resetFilter()),
        unreset: () => dispatch(unreset()),
        deleteFilterTemp: (index) => dispatch(deleteFilterTemp(index)),
    }
 }
 
 export default connect (mapStateToProps, mapDispatchToProps)(Nav);