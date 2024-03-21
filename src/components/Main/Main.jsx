import { useEffect } from "react";
import PropTypes from "prop-types";
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { tempMovieData, tempWatchedData } from "../../../data.js";
import { KEY } from "../../key.js";
import NavBar from "../NavBar/NavBar.jsx";
import StarRating from "../StarRating/StarRating.jsx";
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx";

//START OF MOVIES
function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array,
  onSelectMovie: PropTypes.func.isRequired,
};

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
};

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
Box.propTypes = {
  children: PropTypes.node.isRequired,
};
//END OF MOVIES SECTION

// SUMMARY SECTION //
function WatchedSummary({ watched }) {
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(
    watched.map((movie) => {
      return movie.runtime.split(" ").at(0);
    })
  );
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

WatchedSummary.propTypes = {
  watched: PropTypes.array.isRequired,
};

function SummaryList({ watched, setWatched }) {
  const onDeleteWatched = (movieId) => {
    const updatedArray = watched.filter((item) => item.imdbID !== movieId);
    setWatched(updatedArray);
  };
  return (
    <ul className="list">
      {watched.map((movie) => (
        <Summary
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
SummaryList.propTypes = {
  watched: PropTypes.array,
  setWatched: PropTypes.func,
};
function Summary({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} </span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
Summary.propTypes = {
  movie: PropTypes.object.isRequired,
  onDeleteWatched: PropTypes.func.isRequired,
};

function MovieDetail({
  selectedId,
  onCloseMovie,
  onAddWatched,
  rating,
  setRating,
  watched,
}) {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    imdbID,
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating: imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = selectedMovie;
  const isAdded = watched.some(
    (watchedMovie) => watchedMovie.imdbID === selectedId
  );

  const WatchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating; // using optional chaining

  useEffect(() => {
    const getMoviesDetail = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        if (!response.ok) throw new Error("Something Went Wrong");
        const data = await response.json();

        if (data.Response === " False") throw new Error(data.Error);
        setSelectedMovie(data);
        setIsLoading(false);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getMoviesDetail();
  }, [selectedId]);
  // Adding the selectedId as the dependency array allows the useEffect hook to be re-rendered anytime the the value in the selectedId is changed

  //Altering the  Title of the webpage Dynamically
  useEffect(() => {
    document.title = title;
    //altering th icon as well
    const link =
      document.querySelector("link[rel*='icon'") ||
      document.createElement("link");

    link.type = "image/x-icon ";
    link.rel = "shortcut icon";
    link.href = poster;

    document.head.appendChild(link);

    //cleanup function to remove the old favicon link element

    return () => {
      document.title = "Popcorn";
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, [title]);

  let MovieDetail = {
    imdbID,
    Title: title,
    Year: year,
    Poster: poster,
    runtime: runtime,
    imdbRating: imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    userRating: rating,
  };
  return (
    <div className="details">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} . {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                <b>{imdbRating}</b> IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isAdded ? (
                <>
                  <StarRating
                    maxHeight={10}
                    size={24}
                    rating={rating}
                    setRating={setRating}
                  />

                  {rating > 0 && (
                    <button
                      className="btn-add"
                      onClick={() => onAddWatched(MovieDetail)}
                    >
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <>
                  <p>You rated the movie a {WatchedUserRating} </p>
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Director: {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
//END OF SUMMARY

MovieDetail.propTypes = {
  selectedId: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
  onCloseMovie: PropTypes.func.isRequired,
  onAddWatched: PropTypes.func.isRequired,
  watched: PropTypes.array.isRequired,
};
//export all

export { Box, MovieList, SummaryList, WatchedSummary, MovieDetail };
// MAIN APP
export default function Main({ children }) {
  return <main className="main">{children}</main>;
}
Main.propTypes = {
  children: PropTypes.node.isRequired,
};
