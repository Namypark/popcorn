import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  useEffect(() => {
    function handleEnter(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        console.log("Enter");
        inputEl.current.focus();
      }
    }
    document.addEventListener("keydown", handleEnter);

    return () => {
      document.removeEventListener("keydown", handleEnter);
    };
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
Search.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>Popcorn</h1>
    </div>
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
NumResults.propTypes = {
  movies: PropTypes.func.isRequired,
};
//export all components
export { Logo, Search, NumResults };

export default function NavBar({ children, query, setQuery }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      {children}
    </nav>
  );
}

NavBar.propTypes = {
  children: PropTypes.node.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};
