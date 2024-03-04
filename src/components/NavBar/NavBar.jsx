import { useState } from "react";

function Search() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>Popcorn</h1>
    </div>
  );
}

function NumResults({ watched, movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
//export all components
export { Logo, Search, NumResults };

export default function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />

      {children}
    </nav>
  );
}
