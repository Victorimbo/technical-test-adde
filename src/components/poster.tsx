import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Poster = ({ search }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = "d2d44f6354840ee02978b4d5ba9bcdfd";
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      const data = await response.json();
      setMovies(data.results.slice(0, 8));
    };

    fetchMovies();
  }, []);

  const isTitleMatched = (movieTitle: string) => {
    return movieTitle.toLowerCase().includes(search.toLowerCase());
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
                filter: isTitleMatched(movie.title) ? "blur(5px)" : "none",
              }}
            />
            <span
              style={{
                visibility: isTitleMatched(movie.title) ? "hidden" : "visible",
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