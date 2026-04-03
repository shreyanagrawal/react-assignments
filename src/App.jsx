import { useState } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import Portfolio from './components/Portfolio'
import { ThemeDataContext } from './utils/ThemeSwitcher';
import { faMoon } from '@fortawesome/free-solid-svg-icons'; 
import ThemeSwitcher from './components/ThemeSwitcher';
import MovieInterface from './components/MovieInterface';


function App() {
  const [theme,setTheme] = useState('Dark');
  const [icon,setIcon] = useState(faMoon)
  return (  
    <>
      <ThemeDataContext.Provider value={{theme,setTheme, icon,setIcon}}>
        <div style={{position:"sticky", top: "0px"}}>
          <Navbar />
          <ThemeSwitcher />
        </div>
        
        <Portfolio />
        <MovieInterface />
      </ThemeDataContext.Provider>
      
    </>
    
  )
}

export default App
