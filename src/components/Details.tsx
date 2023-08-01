import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  genres?: string[];
  runtime: number;
  release_date: Date,
  casts: [],
  cast?: string[],
  profile_path?: string[];
}

const Details = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = import.meta.env.VITE_APP_API_KEY;

      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      const movieData = await movieResponse.json();
      
      const creditsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
        );
        const creditsData = await creditsResponse.json();
        console.log(creditsData);

      setMovie({
        id: movieData.id,
        title: movieData.title,
        poster_path: movieData.poster_path,
        overview: movieData.overview,
        release_date: movieData.release_date,
        runtime: movieData.runtime,
        genres: movieData.genres.map((genre: {name: string}) => genre.name),
        casts: creditsData.cast.slice(0, 8),
        cast: creditsData.cast.slice(0, 8).map((actor: {name: string}) => actor.name),
        profile_path: creditsData.cast.slice(0, 8).map((actor: {profile_path: string}) => actor.profile_path)
      });
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contentContainer">
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
            {movie.genres &&
              movie.genres.map((genre, index) => <p key={index}>{genre}</p>)}
          <h3>Resume :</h3>
          <p className="overview">{movie.overview}</p>
        </span>
      </div>
      <h3 className="cast">Cast :</h3>
      <div className="castContainer">
        {movie.casts &&
          movie.casts.map((cast, index) => (
            <div key={index} className="castItem">
              <Avatar
                className="posterDetails"
                src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`}
                sx={{ width: 150, height: 150 }}
                alt={cast.name}
              />
              <p className="actorName">{cast.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Details;