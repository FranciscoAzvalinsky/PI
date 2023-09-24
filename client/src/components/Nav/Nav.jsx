import style from './Nav.module.css'
import SearchBar from '../SearchBar/SearchBar';

import { Link } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";

import { originOfDogs, filterTemperaments, orderByType, orderWay, order } from '../../redux/actions';
function Nav ({SearchByName, originOfDogs, temperaments, filterTemperaments, orderByType, orderWay, order}) {

    let items = [];

    items = temperaments.map ((temper) => {
        return (
                <option value={temper}>{temper}</option>
        )
    })

    const dispatch = useDispatch();

    const handlerOrigin = (e) => {
        dispatch(originOfDogs(e.target.value));
        dispatch(order())
    }

    const handlerTemperaments = (e) => {
        dispatch(filterTemperaments(e.target.value));
        dispatch(order())
    }

    const handlerType = (e) => {
        dispatch(orderByType(e.target.value));
        dispatch(order())

    }

    const handlerOrder = (e) => {
        dispatch(orderWay(e.target.value));
        dispatch(order())
    }

    return (
        <div className={style.divDiv}>
            <SearchBar SearchByName={SearchByName}></SearchBar>
            <Link to='/createDog'>
                <button>
                    <strong>Crea tu propia raza de perros!</strong>
                </button>
            </Link>
            <div className={style.divSelect}>
                <select onChange={handlerOrigin}>
                    <option value='Api'>API</option>
                    <option value='Bdd'>BDD</option>                       
                </select>
                <select onChange={handlerTemperaments}>
                    <option value='All temperaments'>All temperaments</option>
                    {items}
                </select>
                <select onChange={handlerType}>
                    <option value='raza'>Raza</option>
                    <option value='peso'>Peso</option>
                </select>
                <select onChange={handlerOrder}>
                    <option value='A'>Ascendente</option> 
                    <option value='D'>Descendente</option>                                          
                </select>

            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
       showing: state.showing,
       temperaments: state.temperaments,
    }
 }
 
 function mapDispatchToProps (dispatch){
    return {
        originOfDogs: (value) => dispatch(originOfDogs(value)),
        filterTemperaments: (value) => dispatch(filterTemperaments(value)),
        orderByType: (value) => dispatch(orderByType(value)),
        orderWay: (value) => dispatch(orderWay(value)),
        order: () => dispatch(order()),
    }
 }
 
 export default connect (mapStateToProps, mapDispatchToProps)(Nav);