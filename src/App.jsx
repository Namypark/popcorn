/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import NavBar, { NumResults } from "./components/NavBar/NavBar";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import Main, {
  Box,
  MovieList,
  WatchedSummary,
  SummaryList,
  MovieDetail,
} from "./components/Main/Main.jsx";
import { tempMovieData, tempWatchedData } from "../data.js";
import "./components/LoadingScreen/loader.css";
import { KEY } from "./key.js";
import useMovies from "./useMovies.jsx";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null); // for the movie details component
  const [rating, setRating] = useState(0); // for the star rating component
  const { movies, isLoading, error, setMovies, setIsLoading, setError } =
    useMovies(query);
  //const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(() => {
    const getStorage = localStorage.getItem("watched");
    return JSON.parse(getStorage);
  });

  function handleMovieClick(id) {
    setSelectedId(() => (selectedId === id ? null : id));
  }
  function onCloseMovie() {
    setSelectedId(null);
    setRating(0);
  }
  //both buttons are used for the Movie Detail component

  function handleWatched(movie) {
    const isExisting = watched.some(
      (watchedMovie) => watchedMovie.Title === movie.Title
    );
    if (isExisting) {
      setRating(0);

      return;
    } // checks if there is already an existing movie of the same title in the List

    setWatched((prev) => [...prev, movie]);
    setRating(0);
  }
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        if (query.length < 3) {
          setMovies([]);
          setError("");
          return;
        } //If query is empty skip the API REQUEST
        setIsLoading(true);
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("Something went wrong");
        const data = await response.json();
        if (data.Response === "False") throw new Error(data.Error);
        setMovies(data.Search);
        setIsLoading(false);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); //call the async function here

    return () => {
      //clean up but we leave it empty
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched)); // saves item to the browser localStorage
  }, [watched]);
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    };
    document.addEventListener("keydown", handleEscape);

    //clean up function
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="app">
      <NavBar query={query} setQuery={setQuery}>
        <NumResults watched={watched} movies={movies} />
      </NavBar>

      <Main rating={rating} setRating={setRating}>
        <Box>
          {isLoading && <LoadingScreen />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleMovieClick} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              selectedId={selectedId}
              onCloseMovie={onCloseMovie}
              onAddWatched={handleWatched}
              rating={rating}
              setRating={setRating}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <SummaryList watched={watched} setWatched={setWatched} />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}
