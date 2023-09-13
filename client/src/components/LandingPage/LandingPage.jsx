import style from './LandingPage.module.css'
import InButton from '../InButton/InButton'
import { NavLink }  from 'react-router-dom'
export default function LandingPage () {
    return (
        <div className={style.divLand}>
            <div className={style.divDiv}>
                <NavLink to='/home' className={style.linkButton}>
                    <InButton/>
                </NavLink>
            </div>
        </div>
    )
}