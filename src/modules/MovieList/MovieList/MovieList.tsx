import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard/MovieCard";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios.get("https://shift-backend.onrender.com/cinema/today").then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
