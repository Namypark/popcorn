import { useEffect, useState } from "react";
import { KEY } from "./key";
export default function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
  }, [query]);

  return { movies, isLoading, error, setMovies, setIsLoading, setError };
}
