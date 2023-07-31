import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  genres?: string[];
  runtime: number;
  release_date: Date,
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
      console.log(movieData);

      const creditsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
      );
      const creditsData = await creditsResponse.json();

      setMovie({
        id: movieData.id,
        title: movieData.title,
        poster_path: movieData.poster_path,
        overview: movieData.overview,
        release_date: movieData.release_date,
        runtime: movieData.runtime,
        genres: movieData.genres.map((genre) => genre.name),
        cast: creditsData.cast.slice(0, 8).map((actor) => actor.name)
      });
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="title">{movie.title}</h1>
      <div className="wrapper">
        <img className="posterDetails"
          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          alt={movie.title}
        />
        <span className="containerInfos">
          <h3>Release:</h3>
          <p>{movie.release_date.toString()}</p>
          <h3>Duration :</h3>
          <p>{movie.runtime} min</p>
          <h3>Genres :</h3>
          <ul>
            {movie.genres &&
              movie.genres.map((genre, index) => <li key={index}>{genre}</li>)}
          </ul>
          <h3>Resume :</h3>
          <p className="overview">{movie.overview}</p>
        </span>
      </div>
          <h3 className="cast">Cast :</h3>
          <ul>
            {movie.cast &&
              movie.cast.map((actor, index) => <li key={index}>{actor}</li>)}
          </ul>
    </div>
  );
};

export default Details;