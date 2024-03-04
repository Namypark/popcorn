import { useState } from "react";
import NavBar, { Logo, Search, NumResults } from "./components/NavBar/NavBar";
import Main, {
  ListBox,
  SummaryBox,
  MovieList,
} from "./components/Main/Main.jsx";
import { tempMovieData, tempWatchedData } from "../data.js";

export default function App() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <div className="app">
      <NavBar>
        <NumResults watched={watched} movies={movies} />
      </NavBar>

      <Main>
        <ListBox>
          <MovieList movies={movies} watched={watched} />
        </ListBox>
        <SummaryBox watched={watched} />
      </Main>
    </div>
  );
}
