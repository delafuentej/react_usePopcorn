import { useEffect, useRef } from "react";
import { useKey } from "../hooks/useKey";


const Search = ({query, setQuery}) => {
   const searchInput = useRef(null);

   useKey('Enter',()=>{
    if(document.activeElement === searchInput.current) return;
    searchInput.current.focus();
    setQuery("");
   })

  //  useEffect(()=> {

  //   const callback = (e) => {
  //     if(document.activeElement === searchInput.current) return;

  //     if(e.code === "Enter"){
  //       searchInput.current.focus();
  //       setQuery("");
  //     }
      
  //   }

  //     document.addEventListener('keydown', callback)
  //     return () => document.removeEventListener('keydown',callback);
      
  //  },[setQuery])
  // useEffect(()=> {
  //   // focus on searchInput after first rendering
  //   const searchInput  = document.querySelector('.search');
  //   searchInput.focus();
  // },[])

    return(
        <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={searchInput}
      />
    )
}
export default Search;