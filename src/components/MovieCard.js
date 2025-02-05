

const MovieCard = ({movie, children, handleMovieSelect}) => {
    return(
        <li
        key={movie.imdbID}
        onClick={()=> handleMovieSelect && handleMovieSelect(movie.imdbID)}
        >
            <img src={((movie.Poster && movie.Poster !=='N/A') || (movie.poster && movie.poster !=='N/A')) ?  movie.Poster || movie.poster : '/img/no-image.png'} alt={`${movie.Title || movie.title} poster`} />
            <h3>{movie.Title || movie.title}</h3>
            <div>
                {children}
            </div>
        </li>

    )
}

export default MovieCard;