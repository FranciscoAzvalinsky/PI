import style from './Nav.module.css'
import SearchBar from '../SearchBar/SearchBar';

import { Link } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";

import { originOfDogs, filterTemperaments, orderByType, orderWay, order, resetFilter, loadFilterTemperaments, unreset, deleteFilterTemp } from '../../redux/actions';
import Checkbox from '../Checkbox/Checkbox';
function Nav ({SearchByName, temperaments, filteredTemperaments}) {

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
        dispatch(loadFilterTemperaments(e.target.value))
        dispatch(filterTemperaments());
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

    const handleDeleteElement = (index) => {
        dispatch(deleteFilterTemp(index))
        dispatch(filterTemperaments());
        dispatch(order());
    }

    return (
        <div className={style.divDiv}>
            <SearchBar SearchByName={SearchByName}></SearchBar>
            <Link to='/createDog'>
                <button>
                    <strong>Create your own dog's race!</strong>
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
                <div className={style.divTemps}>
                    <ul className={style.ulTemps}>
                        {filteredTemperaments.map((temper, index) => (
                            <li key={index}>{temper} <button onClick={() => handleDeleteElement(index)}>X</button></li>
                        ))}
                    </ul>
                </div>
                <select onChange={handlerType}>
                    <option value='raza'>Race</option>
                    <option value='peso'>Weight</option>
                </select>
                <select onChange={handlerOrder}>
                    <option value='A'>Ascending </option> 
                    <option value='D'>Descending</option>                                          
                </select>
            <Checkbox text='Default values' onChange={reseter}></Checkbox>
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
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