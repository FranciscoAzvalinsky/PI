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
         <label for='clearName'>Clear name</label>
         <input type='checkbox' onClick={clearInput} id='clearName' className={style.boton2}></input>
        <input type='search' onChange={handleChange} value = {dogsName} placeholder='Search for a race...'></input>
        <Link to = '/home/name'>
            <button className={style.boton} onClick={handleSearch} type="button">
               <strong>Search</strong>
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