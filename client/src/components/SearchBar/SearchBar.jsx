import style from './SearchBar.module.css';
import { useState } from 'react';

export default function SearchBar({SearchByName}) {
    const [name, setName] = useState("")
 
    const handleChange = (e) => {
      setName(e.target.value)
    }
 
    const handleSearch = () => {
      SearchByName(name);
      setName('')
    }
    return (
       <div className={style.searchBar}>
        <input type='search' onChange={handleChange} value = {name} placeholder='Buscar una raza...'></input>
        <button className={style.boton} onClick={handleSearch} type="button">
             <strong>Buscar</strong>
          </button>
       </div>
    );
 }