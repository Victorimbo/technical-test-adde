import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  blur: boolean;
}

const Poster = ({ search }) => {
  const defaults: Pick<Movie, "blur"> = {
    blur: true
  };

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = "d2d44f6354840ee02978b4d5ba9bcdfd"; // env var --> .env --> process.env.REACT_APP_... process.env.REACT_APP_API_KEY
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

  const navigate = useNavigate();
  
  const handleImageClick = (id: number) => {
    const movie = movies.find((movie) => movie.id === id);
    if (movie && !movie.blur) {
      navigate(`/details/${id}`);
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
                filter: movie.blur ? "blur(5px)" : "none",
                border: movie.blur ? "none" : "2px solid green",
                cursor: movie.blur ? "default" : "pointer"
              }}
              onClick={() => handleImageClick(movie.id)}
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
