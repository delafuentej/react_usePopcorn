import {useState} from 'react';
import db from './data/data.json';

import Navbar from './components/Navbar';
import Main from './components/Main';
import ListBox from './components/ListBox';
import WatchedBox from './components/WatchedBox';
// import StarRating from './components/StarRating';

const {tempMovieData, tempWatchedData} = db.data;



export default function App() {
  
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  

  return (
    <>
      <Navbar query={query} setQuery={setQuery} movies={movies}/>
      <Main>
        <ListBox isOpen1={isOpen1} setIsOpen1={setIsOpen1} movies={movies}/>
        <WatchedBox isOpen2={isOpen2} setIsOpen2={setIsOpen2} watched={watched}/>
        {/* <StarRating messages ={['Terrible', 'Bad', 'Ok', 'Good', 'Amazing']}/>
        <StarRating  color='red'/> */}
      </Main>
    </>
  );
}