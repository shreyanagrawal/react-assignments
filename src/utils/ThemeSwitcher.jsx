import { createContext } from "react";

//utils/ThemeSwitcher.jsx
export const ThemeDataContext = createContext({
    theme:'',
    setTheme:()=>{},
    icon:null,
    setIcon:()=>{}
})