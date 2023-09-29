import style from './SearchBar.module.css';
import { Link } from 'react-router-dom';

import Checkbox from '../Checkbox/Checkbox';
import Button from '../Button/Button';

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
         <Checkbox text='Clear name' onClick={clearInput}></Checkbox>
        <input type='text' onChange={handleChange} value = {dogsName} placeholder='Search for a race...' className={style.input}></input>
        <Link to = '/home/name'>
            <Button text='Search' onClick={handleSearch} marginLeft={'15px'} marginRight={'15px'}></Button>
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