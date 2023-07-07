import React from "react";
import { Link } from "react-router-dom";
import { IMovie } from "./types/IMovie";
import { url } from "../../constants/requestUrl";
import "./MovieCard.scss";

const MovieCard = ({ movie }) => {
  const {
    id,
    name,
    title,
    description,
    img,
    genres,
    releaseDate,
    userRatings,
  } = movie;

  const handleClick = () => {
    console.log("click");
  };

  return (
    <div className="movie-card">
      <div className="movie-card-image">
        <img src={url + img} alt={name} className="card-image" />
      </div>
      <div className="movie-card-details">
        <p>Жанры: {genres.map((genreItem) => genreItem).join(", ")}</p>

        <p>Дата Выпуска: {releaseDate}</p>
        <h3>{name}</h3>
        <p>Рейтинг: {userRatings.kinopoisk}</p>

        <Link to={`/films/${id}`} className="btn">
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
