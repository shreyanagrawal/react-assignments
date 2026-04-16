//components/FavouriteMovies.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart as solid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regular } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from 'react';
import "../assets/css/favouriteMovies.css"
import { useContext } from 'react';
import { FavMovieContext } from '../utils/FavMovieSelector';

const FavouriteMovies = (props) => {
  const [favouriteMovie, setFavouriteMovie] = useState(false);
  const {selectedMovie,setSelectedMovie} = useContext(FavMovieContext)
  useEffect(()=>{
      if(props.favourite.includes(props.title))
          setFavouriteMovie(true);
    },[])

    const getRatingCategory = (rating) => {
        if (rating >= 8) return "excellent";
        if (rating >= 6.5) return "good";
        if (rating >= 5) return "average";
        return "poor";
    }

    const getColor = (category)=>{
        switch(category){
        case "excellent":
            return "green"
        case "good":
            return "#ffcc00"
        case "average":
            return "orange"
        default:
            return "red"
        }
    }

    let category = getRatingCategory(props.rating);
    let style = getColor(category);
    const handleFavourite = (title) => {
        setSelectedMovie(prev => prev.filter((movie) => movie !== title));        
        sessionStorage.removeItem('movie_'+title)
    }
  return (
    
        props.favourite.includes(props.title)? (
                <>
                    <div className="favourite">
                        <span className="cross" style={{position: "absolute", right:"10px", cursor:"pointer"}} onClick={()=>handleFavourite(props.title)}>x</span>
                        <span className="fav-title">{props.title}</span>
                        <span className="fav-genre">{props.genre}</span>
                        <div className="fav-info">
                            <span className={`fav-ratings ${category}`} style={{backgroundColor: style}}><FontAwesomeIcon icon={faStar} style={{paddingRight: "5px"}}/>{props.rating}</span>
                            <span className="fav-cast">{props.cast.join(', ')}</span>
                            <span className={`favourite-badge ${favouriteMovie ? "fav" : "no-fav"}`}><FontAwesomeIcon icon={favouriteMovie ? solid : regular}  className={favouriteMovie ? "solid" : "regular"}/>Favourite</span>
                        </div>
                    </div>
                </>
            ):(null)
    
    
  )
}

export default FavouriteMovies
