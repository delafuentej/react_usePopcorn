import {useState, useEffect} from 'react';
//import db from './data/data.json';

import Navbar from './components/Navbar';
import Main from './components/Main';
import ListBox from './components/ListBox';
import WatchedBox from './components/WatchedBox';


//const {tempMovieData, tempWatchedData} = db.data;


const apiKey = process.env.REACT_APP_OMDB_API_KEY;



export default function App() {
  
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedId,  setSelectedId] = useState(null);

  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const [isLoading,  setIsLoading ] = useState(false);
  const [ error,  setError] = useState('');



  const handleMovieSelect = (id) => {
    setSelectedId( currentSelectedId => currentSelectedId === id ? null: id);
   
  };

  const handleCloseSelectedMovie = () => {
    setSelectedId(null);
  };
  
  const handleAddWatchedMovie = (movie) => {
    setWatched( watched => [...watched, movie]);
  };

  const handleDeleteWatchedMovie = (id) => {
    setWatched((watched) => watched.filter( movie => movie.imdbID !== id));
  }


  useEffect(()=>{
    //using native browser API => abort controller
    const controller =  new AbortController();
   const fetchMovies = async() => {

    setIsLoading(true);
    setError('');
      try{
        const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${query}`,
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

   handleCloseSelectedMovie()
   fetchMovies();

   //clean-up function
   return ()=>{
    controller.abort()
   }

  }, [query])

  
  return (
    <>
      <Navbar query={query} setQuery={setQuery} movies={movies}/>
      <Main>
        <ListBox 
          isOpen1={isOpen1} 
          setIsOpen1={setIsOpen1} 
          movies={movies} 
          isLoading={isLoading} 
          error={error}
          handleMovieSelect={handleMovieSelect}
          />
        <WatchedBox 
          isOpen2={isOpen2} 
          setIsOpen2={setIsOpen2} 
          watched={watched} 
          selectedId={selectedId} 
          handleCloseSelectedMovie = {handleCloseSelectedMovie}
          handleAddWatchedMovie = {handleAddWatchedMovie}
          handleDeleteWatchedMovie = {handleDeleteWatchedMovie}
          />
       
      </Main>
    </>
  );
}