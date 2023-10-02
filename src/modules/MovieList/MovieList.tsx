import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../ApiModules/AfficheMovies/slice";
import { RootState } from "../../store/store";
import MovieCard from "../MovieList/components/MovieCard/MovieCard";
import s from "./MovieList.module.scss";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.data);
  const loading = useSelector((state: RootState) => state.movies.loading);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className={s.MovieList}>
      {loading && <p>Loading...</p>}
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
