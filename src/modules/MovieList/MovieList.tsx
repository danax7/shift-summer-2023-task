import { useEffect, useState } from "react";
import axios from "axios";
import { IMovie } from "../MovieList/components/MovieCard/types/IMovie";
import MovieCard from "../MovieList/components/MovieCard/MovieCard";
import s from "./MovieList.module.scss";
import { url } from "./constants/requestUrl";

const MovieList = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(url + "/cinema/today");
        const data = response.data;
        setMovies(data.films);
        console.log(data.films);
      } catch (error) {
        console.error("Ошибка при получении списка фильмов:", error);
      }
    };

    getMovies();
  }, []);

  return (
    <div className={s.MovieList}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
