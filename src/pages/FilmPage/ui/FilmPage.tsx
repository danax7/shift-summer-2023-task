import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IMovie } from "../../../modules/MovieList/components/MovieCard/types/IMovie";
import { ISchedule } from "../../../modules/Schedule/types/ISchedule";
import { url } from "../../../modules/MovieList/constants/requestUrl";
import s from "./FilmPage.module.scss";
import Schedule from "../../../modules/Schedule/Schedule";

const FilmPage = () => {
  const { filmId } = useParams<{ filmId: string }>();
  const [film, setFilm] = useState<IMovie | null>(null);
  const [schedule, setSchedule] = useState<ISchedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    const getFilm = async () => {
      try {
        const response = await axios.get(url + `/cinema/film/${filmId}`);
        setFilm(response.data.film);
      } catch (error) {
        console.error("Ошибка при получении информации о фильме:", error);
      }
    };

    const getSchedule = async () => {
      try {
        const response = await axios.get(
          url + `/cinema/film/${filmId}/schedule`
        );
        const schedules = response.data.schedules;

        if (schedules.length > 0) {
          setSchedule(schedules);
          setSelectedDate(schedules[0].date);
        }
      } catch (error) {
        console.error("Ошибка при получении расписания сеансов:", error);
      }
    };

    getFilm();
    getSchedule();
  }, [filmId]);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  if (!film || schedule.length === 0) {
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

        <div className={s.Dates}>
          {schedule.map((scheduleItem) => (
            <button
              key={scheduleItem.date}
              onClick={() => handleDateClick(scheduleItem.date)}
              className={selectedDate === scheduleItem.date ? s.ActiveDate : ""}
            >
              {scheduleItem.date}
            </button>
          ))}
        </div>

        <Schedule schedule={schedule} selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default FilmPage;
