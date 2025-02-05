import { useEffect, useState } from "react";

import StarRating from "./StarRating";
import SpinnerLoader from "./Loader";
import CustomButton from "./CustomButton";

const apiKey= process.env.REACT_APP_OMDB_API_KEY;

const SelectedMovieDetails = ({selectedId, handleCloseSelectedMovie, handleAddWatchedMovie, watched}) => {
    const [details,  setDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);

    const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find( movie => movie.imdbID === selectedId)?.userRating;
    
    const {
        Title: title,
         Year: year,
         Poster: poster, 
         Runtime: runtime, 
         imdbRating,
         Plot: plot,
         Released: released,
         Actors: actors,
         Director: director,
         Genre: genre
        } = details;



    const handleAdd = () => {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            userRating,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
        }
        handleAddWatchedMovie(newWatchedMovie);
        handleCloseSelectedMovie();
    };

    useEffect(()=> {
        setIsLoading(true);
        const fetchDetails = async() => {

            try{
            const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`);

            if(!res.ok) throw new Error('Something went wrong with fetching details :(');

            const data=  await res.json();

            if(data.Response === 'False') throw new Error(`Details of Movie-Id:${selectedId} not found`);

            setDetails(data);

        

        }catch(error){

            console.log(error.message)

        }finally{
            setIsLoading(false);
          }
        };

        fetchDetails();
    }, [selectedId]);


    useEffect(()=>{
        if(title){
            document.title= `Movie | ${title}`;

            return ()=>{
                document.title= ' 🍿UsePopcorn'
            }
        }
        

    },[title]);

      //effect: listening to a keypress

  useEffect(()=>{
    const callback = (e) => {
        if(e.code === 'Escape'){
            handleCloseSelectedMovie();
          
          }
    }
    document.addEventListener('keydown',callback);
      //clean-up funcion
      return () => {
        document.removeEventListener('keydown',callback)
      }
  },[handleCloseSelectedMovie]);


    return(
        <div className="details">
            {
                isLoading ? 
                (
                <SpinnerLoader />
                ) 
                :
                (
                    <>
                         <header>
                    <button
                        className="btn-back"
                        onClick={handleCloseSelectedMovie}
                        >⬅
                    </button>
                    <img src={(poster && poster !=='N/A') ? poster : '/img/no-image.png'} alt={`Poster of ${title}`} />
                    <div className='details-overview'>
                        <h2>{title}</h2>
                        <p>
                            {(released && released !=='N/A') ? released : '' } &bull; {(runtime && released !=='N/A') ? runtime : ''}
                        </p>
                        <p>{(genre && genre !== 'N/A') ? genre : null}</p>
                        <p>
                            <span>⭐️</span>
                           IMDb-Rating: {imdbRating}
                        </p>
    
                    </div>
                </header>
                <section>
                    <div className="rating">
                        {
                            (!isWatched) ?

                            (
                                <>
                                    <StarRating 
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />
                                    {(userRating > 0) && (
                                        <CustomButton
                                        handleClick={handleAdd}
                                        className='btn-add'
                                        >
                                            + Add to Watched List
                                        </CustomButton>
                                    )} 
                            
                                </>
                            )
                                
                            :
                            (
                               <p>You have already rated the movie: <span>⭐️</span>{watchedUserRating}</p> 
                            )
                      
                        }
                    
                        
                    </div>
                   
                    {(plot && plot !== 'N/A') && <p><em>{plot}</em></p>}
                    {(actors && actors !== 'N/A') && <p>Starring: {actors}</p>}
                    {(director && director !== 'N/A') && <p>Directed by: {director}</p>}
                    
    
    
                </section>
                    
                    </>
                )
            }
           
            
          
            
            
        </div>
    )
}

export default SelectedMovieDetails;