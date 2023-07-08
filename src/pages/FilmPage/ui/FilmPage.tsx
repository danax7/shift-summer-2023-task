import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IMovie } from "../../../modules/MovieList/components/MovieCard/types/IMovie";
import { url } from "../../../modules/MovieList/constants/requestUrl";
import s from "./FilmPage.module.scss";

const FilmPage = () => {
  const { filmId } = useParams<{ filmId: string }>();
  const [film, setFilm] = useState<IMovie | null>(null);
  //const [schedule, setSchedule] = useState<ISchedule[]>([]);

  useEffect(() => {
    const getFilm = async () => {
      try {
        const response = await axios.get(url + `/cinema/film/${filmId}`);
        setFilm(response.data.film);
        console.log(response.data.film);
      } catch (error) {
        console.error("Ошибка при получении информации о фильме:", error);
      }
    };

    getFilm();
  }, [filmId]);

  if (!film) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.FilmWrapper}>
      <div className={s.FilmContent}>
        <div className={s.FilmContent__info}>
          <div className={s.FilmContent__imageBlock}>
            <img
              src={url + film.img}
              alt={film.name}
              className={s.FilmContent__imageBlock_image}
            />
          </div>
          <div className={s.FilmContent__details}>
            <h2 className={s.FilmName}>{film.name}</h2>
            <p className={s.director}>
              Режиссер:{" "}
              {film.directors.map((director) => director.fullName).join(", ")}
            </p>
            <p className={s.genres}>
              Жанры: {film.genres.map((genreItem) => genreItem).join(", ")}
            </p>
            <p>Дата Выпуска: {film.releaseDate}</p>
            <p className={s.FilmRating}>
              Kinopoisk - {film.userRatings.kinopoisk}
            </p>
            <p className={s.actors}>
              Актеры: {film.actors.map((actor) => actor.fullName).join(", ")}
            </p>
            <p className={s.description}>Описание: {film.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmPage;
