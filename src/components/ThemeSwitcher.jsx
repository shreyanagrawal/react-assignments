//components/ThemeSwitcher.jsx
import React, { useContext, useEffect } from 'react'
import { ThemeDataContext } from '../utils/ThemeSwitcher'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon , faSun} from '@fortawesome/free-solid-svg-icons'; 

const ThemeSwitcher = () => {
    const {theme,setTheme} = useContext(ThemeDataContext);
    const {icon,setIcon} = useContext(ThemeDataContext);

    const toggleTheme = () => {
        if(theme === 'Light'){
            setTheme(prev=>'Dark')
            setIcon(prev=>faMoon)
        }
        else {
            setIcon(prev=>faSun)
            setTheme(prev=>'Light')
        }
    }
  useEffect(()=>{
    document.querySelector('body').className = '';
    document.querySelector('body').classList.toggle(theme.toLowerCase())
  },[theme])
  return (
    <button onClick={toggleTheme} style={{float: "right", margin: "10px", padding: "10px 15px", cursor: "pointer", borderRadius: "25px", backgroundColor: "#e6eef8", outline: "none", color: "black", border: "0px" }}><FontAwesomeIcon icon={icon}/>Toggle theme</button>
  )
}

export default ThemeSwitcher
