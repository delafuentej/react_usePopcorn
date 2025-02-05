import MovieCard from './MovieCard';
import MovieInfo from './MovieInfo';

const MoviesList = ({movies, handleMovieSelect}) => {
    return(
        <ul 
        className="list list-movies"
        >
                {movies?.map((movie) => (
                  <MovieCard 
                    movie={movie} 
                    key={movie.imdbID}
                    handleMovieSelect={handleMovieSelect}
                    >
                    <MovieInfo emoji={'🗓'} movie={movie} >
                      {movie.Year}
                      </MovieInfo>
                  </MovieCard>
                ))}

              </ul>
    )
}
export default MoviesList;