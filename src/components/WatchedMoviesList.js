import MovieCard from './MovieCard';
import MovieInfo from './MovieInfo';
import CustomButton from './CustomButton';

const WatchedMoviesList = ({watched, handleDeleteWatchedMovie}) => {
    return(
        <ul className="list">
        {watched.map((movie) => (
           
          <MovieCard movie={movie} key={movie.imdbID}>
              <MovieInfo movie={movie} emoji={'⭐️'} >
              {(movie.imdbRating && movie.imdbRating !== NaN) ? movie.imdbRating : 0}
              </MovieInfo>
              
                <MovieInfo movie={movie} emoji={'🌟'} >
                  {movie.userRating}
                </MovieInfo>

                <MovieInfo movie={movie} emoji={'⏳'} >
                  {movie.runtime} min
                </MovieInfo>


              <CustomButton
              className='btn-delete'
              handleClick={()=> handleDeleteWatchedMovie(movie.imdbID)}
              >
                Ｘ
              </CustomButton>
                
              
                
          </MovieCard>
        
          
          
        )
        )
      }
      </ul>
        
    )
};

export default WatchedMoviesList;