import style from './SearchBar.module.css';
import { Link } from 'react-router-dom';

import Checkbox from '../Checkbox/Checkbox';

import { connect, useDispatch } from "react-redux";
import { loadName, resetName, order } from '../../redux/actions';



function SearchBar({SearchByName}) {
    const dispatch = useDispatch()
 

    //handler que modifica el estado que contiene el nombre que se desea buscar
    const handleChange = (e) => {
      dispatch(loadName(e.target.value))
    }
 
    //handler para ejecutar la funcion de busqueda
    const handleSearch = async () => {
      await SearchByName();
    }

    //funcion para el limpiado de la busqueda y mostrar el orden previo
    const clearInput = (e) => {
      dispatch(resetName());
      handleSearch();
      order();
    }

    return (
       <div className={style.searchBar}>
         <Checkbox text='Clear name' onClick={clearInput}></Checkbox>
        <div className={style.search}>
          <input placeholder="Search..." type="text" onChange={handleChange}></input>
          <button type="submit" onClick={handleSearch}>Go</button>
        </div>
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