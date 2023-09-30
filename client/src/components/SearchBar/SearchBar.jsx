import style from './SearchBar.module.css';
import { Link } from 'react-router-dom';

import Checkbox from '../Checkbox/Checkbox';

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

    const clearInput = (e) => {
      dispatch(resetName());
      handleSearch();
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