import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { id, title, description } = movie;

  const handleClick = () => {
    console.log("click");
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={`/films/${id}`} onClick={handleClick}>
        Подробнее
      </Link>
    </div>
  );
};

export default MovieCard;
