import React, { useEffect, useState } from 'react';


interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

const Poster = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    
    useEffect(() => {
        const fetchMovies = async () => {
          const apiKey = 'd2d44f6354840ee02978b4d5ba9bcdfd';
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
          );
          const data = await response.json();
          setMovies(data.results.slice(0, 8));
        };
    
        fetchMovies();
      }, []);
    return(
        <div>
            <h1>Popular Movies</h1>
            <ul>
            {movies.map((movie) => (
                <li key={movie.id}>
                    <img
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                    alt={movie.title}
                    />
                    <span>{movie.title}</span>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default Poster