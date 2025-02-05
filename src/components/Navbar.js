import Search from './Search';
import Logo from './Logo';
import SearchResult from './SearchResult';

const Navbar = ({query, setQuery, movies}) => {
    return(
        <nav className="nav-bar">
          <Logo />
          <Search query={query} setQuery={setQuery} />
          <SearchResult movies={movies}/>
    
      </nav>
    )
}

export default Navbar;