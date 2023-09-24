import style from './SearchBar.module.css';
import { Link } from 'react-router-dom';

import { connect, useDispatch } from "react-redux";
import { loadName } from '../../redux/actions';


function SearchBar({SearchByName, dogsName}) {
    const dispatch = useDispatch()
 
    const handleChange = (e) => {
      dispatch(loadName(e.target.value))
    }
 
    const handleSearch = async () => {
      await SearchByName();
    }
    return (
       <div className={style.searchBar}>
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
   }
}

export default connect (mapStateToProps, mapDispatchToProps)(SearchBar);