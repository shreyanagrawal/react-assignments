import { createContext } from "react";

//utils/FavMovieSelector.jsx
export const FavMovieContext = createContext({
    selectedMovie:'',
    setSelectedMovie:()=>{},
    favourite:false,
    setFavourite:()=>{}
})