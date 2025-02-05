import { useState, useEffect } from "react";

const apiKey = process.env.REACT_APP_OMDB_API_KEY;

export function useMovies(query, callback){

    const [movies, setMovies] = useState([]);
    const [isLoading,  setIsLoading ] = useState(false);
    const [ error,  setError] = useState('');


    useEffect(()=>{
        callback?.();
        //using native browser API => abort controller
        const controller =  new AbortController();
       const fetchMovies = async() => {
    
        setIsLoading(true);
        setError('');
          try{
            const res = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${query}`,
              {signal: controller.signal }
            )
    
            if(!res.ok) throw new Error('Something went wrong with fetching movies :(');
    
            const data = await res.json();
    
            if(data.Response === 'False') throw new Error('Movies not found');
    
            setMovies(data.Search);
            setError('');
    
      }catch(error){
    
        if(error.name !== "AbortError"){
          console.log(error.message);
          setError(error.message);
        }
        
    
      } finally{
        setIsLoading(false);
      }
       };
    
       if(query.length <= 3){
    
        setMovies([]);
        setError('');
        return;
       }
    
      // handleCloseSelectedMovie()
       fetchMovies();
    
       //clean-up function
       return ()=>{
        controller.abort()
       }
    
      }, [query])

      return {
        movies,
        isLoading,
        error
      }
}