import React, { useEffect, useState } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  blur: boolean;
}

const Poster = ({ search, setSearch }) => {
  const defaults: Pick<Movie, "blur"> = {
    blur: true
  };

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = "d2d44f6354840ee02978b4d5ba9bcdfd";
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      const data = await response.json();
      setMovies(
        data.results.slice(0, 8).map((movie) => ({
          ...defaults,
          ...movie
        }))
      );
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const matchedMovies = movies.map((movie) => ({
      ...movie,
      blur: isTitleMatched(movie.title) ? false : movie.blur
    }));

    setMovies(matchedMovies);
  }, [search]);

  const isTitleMatched = (movieTitle: string) => {
    return search !== "" && movieTitle.toLowerCase() === search.toLowerCase();
  };

  const handleInputSubmit = (inputValue) => {
    setSearch(inputValue);
    if (inputValue === "") {
      const clearBlurMovies = movies.map((movie) => ({ ...movie, blur: false }));
      setMovies(clearBlurMovies);
    } else {
      const matchedMovies = movies.map((movie) => ({
        ...movie,
        blur: isTitleMatched(movie.title) ? false : movie.blur
      }));
      setMovies(matchedMovies);
    }
  };

  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
              style={{
                filter: movie.blur ? "blur(5px)" : "none"
              }}
            />
            <span
              style={{
                visibility: movie.blur ? "hidden" : "visible"
              }}
            >
              {movie.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Poster;