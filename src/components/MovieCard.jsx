//components/MovieCard.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/movieCard.css"
import { faHeart as regular} from '@fortawesome/free-regular-svg-icons'
import { faHeart as solid} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import { useContext } from "react";
import { FavMovieContext } from "../utils/FavMovieSelector";
const MovieCard = (props) => {
  const {selectedMovie,setSelectedMovie} = useContext(FavMovieContext);

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
  const [favourite, setFavourite] = useState(false);
  const handleFavourite = () => {
    setFavourite(prev => {
      const updated = !prev;

      if (updated)
        sessionStorage.setItem('movie_' + props.title, "true");
      else
        sessionStorage.removeItem('movie_' + props.title);

      return updated;
    });

    setSelectedMovie(prev => [...prev, props.title]);
  };
  useEffect(()=>{
    debugger;
    if(props.favourite.includes(props.title))
        setFavourite(prev => {
          const updated = !prev;
          return updated;
        });
  },[selectedMovie])
  return (
    <div className={`movie-card ${category}`}>
      <span className="likes"><FontAwesomeIcon icon={favourite ? solid : regular} onClick={handleFavourite} id="movie-likes" className={favourite ? "solid" : "regular"}/></span>
      <img src={props.image} alt={`${props.title} poster`} className="movie-image"/>
      <h3 className="movie-title">{props.title}</h3>
      <p className="movie-year">{props.year}</p>
      <p className="movie-genre">{props.genre}</p>
      <p className="movie-director">Director: {props.director}</p>
      <p className="movie-cast">Starring: {props.cast.join(' ')}</p>
      <div className={`movie-rating ${category}`} style={{backgroundColor: style}}><span style={{opacity: 0.8}}>{props.rating}/10</span></div>
    </div>
  )
}

export default MovieCard
