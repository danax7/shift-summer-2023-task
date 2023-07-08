import { useEffect, useState } from "react";
import axios from "axios";
import { IMovie } from "../MovieList/components/MovieCard/types/IMovie";
import MovieCard from "../MovieList/components/MovieCard/MovieCard";
import s from "./MovieList.module.scss";

const MovieList = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          "https://shift-backend.onrender.com/cinema/today"
        );
        const data = response.data;

        setMovies(data.films);

        //const movieId = "1";
        //const movie = data.films.find((movie: IMovie) => movie.id === movieId);
        console.log(data.films);
        // if (movie) {
        //   console.log("Название фильма:", movie.name);
        // } else {
        //   console.log("Фильм не найден");
        // }
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
