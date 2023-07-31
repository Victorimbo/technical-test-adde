import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  cast?: string[];
}

const Details = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = "d2d44f6354840ee02978b4d5ba9bcdfd";

      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      const movieData = await movieResponse.json();

      const creditsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
      );
      const creditsData = await creditsResponse.json();

      setMovie({
        id: movieData.id,
        title: movieData.title,
        poster_path: movieData.poster_path,
        overview: movieData.overview,
        cast: creditsData.cast.map((actor) => actor.name)
      });
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>

      <h3>Cast:</h3>
      <ul>
        {movie.cast &&
          movie.cast.map((actor, index) => <li key={index}>{actor}</li>)}
      </ul>
    </div>
  );
};

export default Details;