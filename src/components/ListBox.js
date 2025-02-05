import Box from './Box';
import MoviesList from './MoviesList';
import SpinnerLoader from './Loader';
import ErrorMessage from './ErrorMessage';

const ListBox = ({movies, isOpen1, setIsOpen1, isLoading, error, handleMovieSelect}) => {
    return(
        <Box 
          isOpen={isOpen1} 
          setIsOpen={setIsOpen1} 
          element={
            (error) ? 
            (<ErrorMessage message={error} /> ) :
            isLoading ? (<SpinnerLoader />) :
            (<MoviesList movies={movies} handleMovieSelect={handleMovieSelect}/>)
          } 
        />
          
    )
   
}

export default ListBox;