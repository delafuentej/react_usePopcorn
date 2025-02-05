import Box from './Box';
import WatchedMoviesList from './WatchedMoviesList';
import SummaryWatchedMovies from './SummaryWatchedMovies';
import SelectedMovieDetails from './SelectedMovieDetails';


const WatchedBox = ({
  isOpen2, 
  setIsOpen2, 
  watched, 
  selectedId, 
  handleCloseSelectedMovie, 
  handleAddWatchedMovie,
  handleDeleteWatchedMovie
}) => {

   

    return(
        <Box 
          isOpen={isOpen2} 
          setIsOpen={setIsOpen2 }
          element={
              selectedId ? 
             (
              <SelectedMovieDetails 
                selectedId={selectedId} 
                handleCloseSelectedMovie={handleCloseSelectedMovie}
                handleAddWatchedMovie= {handleAddWatchedMovie}
                watched={watched}
              />
              ) :
             (
              <>
                <SummaryWatchedMovies watched={watched}/>
                <WatchedMoviesList 
                  watched={watched} 
                  handleDeleteWatchedMovie={handleDeleteWatchedMovie}
                  />
              </>
              )
            
            
           }
        />
      
    )
}

export default WatchedBox;