//componets/BollywoodMovies.jsx
import { useEffect, useMemo, useState } from "react"
import "../assets/css/bollywoodMovies.css"
import { bollywoodMoviesData } from "../utils/bollywoodMoviesData";
import MovieCard from "./MovieCard";
import FavouriteMovies from "./FavouriteMovies";
import { useContext } from "react";
import { FavMovieContext } from "../utils/FavMovieSelector";
const MovieInterface = () => {
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [movies, setMovies] = useState(bollywoodMoviesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [filteredMovies, setFilteredMovies] = useState(bollywoodMoviesData);
  const [favMovies,setFavMovies] = useState([]);
  const [showFavourite, setShowFavourite] = useState(false)
  const {selectedMovie,setSelectedMovie} = useContext(FavMovieContext)

  useEffect(()=>{
    setInterval(()=>{
        setLoading(!loading);
    },5000);
  },[])

  useEffect(()=>{
    const favMovie = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if(isNaN(key) && key.includes('movie_'))
        favMovie.push(key.split('_')[1]);
    }
    setFavMovies(favMovie);
  },[selectedMovie])

  const sortedAndFilteredMovies = useMemo(()=>{
    const filtered = movies.filter(movie => {
      const matchSearch =  movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || movie.genre.split(',').some(g => g.trim().toLowerCase().includes(searchTerm.toLowerCase()))  || movie.cast.some((actor)=>actor.toLowerCase().includes(searchTerm.toLowerCase())) || movie.director.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || movie.genre.split(',').some(g => g.trim().toLowerCase() === selectedGenre.toLowerCase());
      return matchSearch && matchesGenre;
    })
    filtered.sort((a,b)=>{
      switch(sortBy){
        case 'rating':
          return b.rating - a.rating;
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    })
    setFilteredMovies(filtered);
    return filtered;
  },[movies,searchTerm,selectedGenre,sortBy])

  const genres=['All', ...new Set(movies.flatMap((movie)=>movie.genre.split(",").map(g=>g.trim())))];

  return (
    <div id="movieinterface" className="bollywood-movies">
      <h1>Bollywood Showcase</h1>
      {loading ? (
        <div className="loading-spinner">
            <p>Loading List...</p>
        </div>
       ) : (
        <>
          <div className="main-content">
            <div className="search-section">
              <input type="text" placeholder="Search Movies.." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className="search-box"/>
              {searchTerm && 
                <p className="search-results">Found {filteredMovies.length} movie{filteredMovies.length > 1 ? 's':''} for "{searchTerm}"</p>
              }
            </div>
            <div className="filter-section">
              <h4>Filter by Genre</h4>
              <div className="genre-buttons">
                {
                  genres.map((genre)=>(<button key={genre} className={`genre-button ${selectedGenre === genre ? 'active' : ''}`} onClick = {()=>setSelectedGenre(genre)}>{genre}</button>))
                }
              </div>
            </div>
            {(searchTerm || selectedGenre !== 'All') && 
                  <button className="clear-filters" onClick={()=>{setSearchTerm(''); setSelectedGenre('All')}}>Clear All Filters</button>
            }
            <div className="sort-section">
              <label htmlFor="sort-select">Sort By:</label>
              <select id="sort-select" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
                <option value="title">Title(A - Z)</option>
                <option value="rating">Rating(High - Low)</option>
              </select>
            </div>
            {
              favMovies.length>0 && <div style={{textAlign: "right"}}><button className="favourites" onClick={()=>setShowFavourite(true)}> Show Favourite Movies</button></div>
            }
            <div className="movies-grid">
              {sortedAndFilteredMovies.length > 0 ? (
                sortedAndFilteredMovies.map((movie)=>(
                  <MovieCard key={movie.id} image={movie.thumbnail} title={movie.title} genre={movie.genre} cast={movie.cast} year={movie.year} rating={movie.rating} director={movie.director} favourite={favMovies}/>
                ))) : (
                  <div className="empty-state">
                    <h3>No Movies found</h3>
                    <p>{searchTerm || selectedGenre !== 'All' ? "Try Adjusting your search or filter criteria" : "Start searching to find amazing movies"}</p>
                  </div>
                )}
              
            </div>
        </div>
        {
          <>
            {showFavourite && <h3 className="fav-title">Favourite Movies</h3>}
              <div className="favSection">
                { sortedAndFilteredMovies.length > 0 ? (
                  sortedAndFilteredMovies.map((movie)=>(
                    <FavouriteMovies key={crypto.randomUUID()} title={movie.title} genre={movie.genre} cast={movie.cast} rating={movie.rating} favourite={favMovies}/>
                  ))) : (null)
                }
            </div>
          </>
        }
        </>     
       )}
    </div>
  )
}

export default MovieInterface
