import MovieInfo from './MovieInfo';

const SummaryWatchedMovies = ({watched }) =>{

    //     const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const average = (arr) => arr.length ? arr.reduce((acc, cur) => acc + cur, 0) / arr.length : 0;

//     const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
//   const avgUserRating = average(watched.map((movie) => movie.userRating));
//   const avgRuntime = average(watched.map((movie) => movie.runtime));
const avgImdbRating =(watched.length > 0) ? average(watched.map((movie) => Number(movie.imdbRating)).filter((rating) => !isNaN(rating))).toFixed(2) 
: 0;
const avgUserRating = (watched.length > 0) ? average(watched.map((movie) => Number(movie.userRating)).filter((rating) => !isNaN(rating))).toFixed(2) 
: 0;
const avgRuntime = (watched.length > 0) ? average(watched.map((movie) => Number(movie.runtime)).filter((runtime) => !isNaN(runtime))).toFixed(2)
: 0;

    return(
        <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <MovieInfo emoji={'#️⃣'}>
                  {watched.length} movies
                  </MovieInfo>
                  <MovieInfo emoji={'⭐️'}>
                  {avgImdbRating}
                  </MovieInfo>
                  <MovieInfo emoji={'🌟'}>
                  {avgUserRating}
                  </MovieInfo>
                  <MovieInfo emoji={'⏳'}>
                  {avgRuntime} min
                  </MovieInfo>
                  
                </div>
        </div>
    )
}

export default SummaryWatchedMovies;