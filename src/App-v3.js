import {useState, useEffect} from 'react';


import Navbar from './components/Navbar';
import Main from './components/Main';
import ListBox from './components/ListBox';
import WatchedBox from './components/WatchedBox';
import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';









export default function App() {
  
  const [query, setQuery] = useState("");
  const [selectedId,  setSelectedId] = useState(null);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
//custom hook
  const {movies, isLoading, error} = useMovies(query, handleCloseSelectedMovie);
  

  //const [watched, setWatched] = useState([]);

  const [watched, setWatched] = useLocalStorageState([], 'watched');
  // const [watched, setWatched] = useState(()=> {
  //   const storedValue = localStorage.getItem('watched');
  //   return JSON.parse(storedValue);
  // });



  function handleMovieSelect (id){
    setSelectedId( currentSelectedId => currentSelectedId === id ? null: id);
   
  };

  function handleCloseSelectedMovie (){
    setSelectedId(null);
  };
  
  function handleAddWatchedMovie (movie) {
    setWatched( watched => [...watched, movie]);

  //  localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  };

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter( movie => movie.imdbID !== id));
  }

  // useEffect(()=> {
  //   localStorage.setItem('watched', JSON.stringify(watched));
  // },[watched])

  // useEffect(()=>{
  //   //using native browser API => abort controller
  //   const controller =  new AbortController();
  //  const fetchMovies = async() => {

  //   setIsLoading(true);
  //   setError('');
  //     try{
  //       const res = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${query}`,
  //         {signal: controller.signal }
  //       )

  //       if(!res.ok) throw new Error('Something went wrong with fetching movies :(');

  //       const data = await res.json();

  //       if(data.Response === 'False') throw new Error('Movies not found');

  //       setMovies(data.Search);
  //       setError('');

  // }catch(error){

  //   if(error.name !== "AbortError"){
  //     console.log(error.message);
  //     setError(error.message);
  //   }
    

  // } finally{
  //   setIsLoading(false);
  // }
  //  };

  //  if(query.length <= 3){

  //   setMovies([]);
  //   setError('');
  //   return;
  //  }

  //  handleCloseSelectedMovie()
  //  fetchMovies();

  //  //clean-up function
  //  return ()=>{
  //   controller.abort()
  //  }

  // }, [query])

  
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