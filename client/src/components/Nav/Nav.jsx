import style from './Nav.module.css'

import SearchBar from '../SearchBar/SearchBar';

import { NavLink } from 'react-router-dom';

export default function Nav ({SearchByName}) {
    return (
        <div className={style.divDiv}>
            <SearchBar SearchByName={SearchByName}></SearchBar>
            <div className={style.divSelect}>
                <select>
                    <option value='temp'>Temperamentos</option>
                </select>
                <select>
                    <option value='api'>API</option>
                    <option value='bdd'>BDD</option>
                </select>
            </div>
            <div>
                <select>
                    <option value='raza'>Raza</option>
                    <option value='peso'>Peso</option>
                </select>
                <select>
                    <option value='A'>Ascendente</option>
                    <option value='D'>Descendente</option>
                </select>
            </div>
            
        </div>
    )
}