import React from "react";
import { Link } from "react-router-dom";
import { IMovie } from "./types/IMovie";
import { url } from "../../constants/requestUrl";
import "./MovieCard.scss";

const MovieCard: React.FC<IMovie> = ({ movie }) => {
  const { id, name, title, description, img, genre, releaseDate, userRatings } =
    movie;

  const handleClick = () => {
    console.log("click");
  };

  return (
    <div className="movie-card">
      <div className="movie-card-image">
        <img src={url + img} alt={name} className="card-image" />
      </div>
      <div className="movie-card-details">
        <p>Жанр: {genre}</p>
        <p>Дата Выпуска: {releaseDate}</p>
        <h3>{name}</h3>
        <p>Рейтинг: {userRatings.kinopoisk}</p>
        <a href="#" className="btn">
          Подробнее
        </a>

        {/* <Link to={`/films/${id}`} onClick={handleClick}>
        Подробнее
      </Link> */}
      </div>
    </div>
  );
};

export default MovieCard;
