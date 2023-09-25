import style from './SearchBar.module.css';
import { Link } from 'react-router-dom';

import { connect, useDispatch } from "react-redux";
import { loadName, resetName, order } from '../../redux/actions';


function SearchBar({SearchByName, dogsName}) {
    const dispatch = useDispatch()
 
    const handleChange = (e) => {
      dispatch(loadName(e.target.value))
    }
 
    const handleSearch = async () => {
      await SearchByName();
    }

    const clearInput = () => {
      dispatch(resetName());
      handleSearch();
    }

    return (
       <div className={style.searchBar}>
         <button type='button' onClick={clearInput}></button>
        <input type='search' onChange={handleChange} value = {dogsName} placeholder='Buscar una raza...'></input>
        <Link to = '/home/name'>
            <button className={style.boton} onClick={handleSearch} type="button">
               <strong>Buscar</strong>
            </button>
         </Link>
       </div>
    );
 }

 const mapStateToProps = (state) => {
   return {
       dogsName: state.dogsName,
   }
}

function mapDispatchToProps (dispatch){
   return {
      loadName: (name) => dispatch(loadName(name)),
      resetName: () => dispatch(resetName()),
      order: () => dispatch(order())
   }
}

export default connect (mapStateToProps, mapDispatchToProps)(SearchBar);