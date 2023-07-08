import { Link } from "react-router-dom";
import { url } from "../../constants/requestUrl";
import s from "./MovieCard.module.scss";

const MovieCard = ({ movie }) => {
  const { id, name, img, genres, releaseDate, userRatings } = movie;

  return (
    <div className={s.movie_card}>
      <div className={s.movie_card_image}>
        <img src={url + img} alt={name} className={s.card_image} />
      </div>
      <div className={s.movie_card_details}>
        <p>Жанры: {genres.map((genreItem) => genreItem).join(", ")}</p>

        <p>Дата Выпуска: {releaseDate}</p>
        <h3>{name}</h3>
        <p>Рейтинг: {userRatings.kinopoisk}</p>

        <Link to={`/films/${id}`} className={s.btn}>
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
