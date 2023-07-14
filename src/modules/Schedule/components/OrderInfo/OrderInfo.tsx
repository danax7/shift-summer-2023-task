import React from "react";
import { Seance } from "../../types/ISchedule";
import s from "./OrderInfo.module.scss";
import { IMovie } from "../../../MovieList/components/MovieCard/types/IMovie";

interface OrderInfoProps {
  seance: Seance;
  selectedSeats: number[];
  totalPrice: number;
  handleClearSeats: () => void;
  film: IMovie;
}

const OrderInfo = ({
  seance,
  selectedSeats,
  totalPrice,
  handleClearSeats,
  film,
}: OrderInfoProps) => {
  const formatSelectedSeats = () => {
    return selectedSeats
      .map((seat) => {
        const rowIndex =
          Math.floor((seat - 1) / seance.hall.places[0].length) + 1;
        const placeIndex = ((seat - 1) % seance.hall.places[0].length) + 1;
        return `${rowIndex} ряд - ${placeIndex}`;
      })
      .join(", ");
  };

  return (
    <div className={s.OrderInfo}>
      <div className={s.MovieInfo}>
        <p className={s.SeanceHall}>Зал: {seance.hall.name}</p>
        <p className={s.FilmText}>Фильм: </p>
        <p className={s.info}>{film.name}</p>
        <p className={s.FilmText}>Дата и время сеанса:</p>
        <p className={s.info}>
          {seance.date} {seance.time}
        </p>
        <p className={s.FilmText}>Места: </p>
        <p className={s.info}>{formatSelectedSeats()}</p>
      </div>
      <div className={s.TotalPrice}>
        <p className={s.info}>Сумма: {totalPrice}</p>
        <button className={s.Button} onClick={handleClearSeats}>
          Очистить
        </button>
        <button
          className={s.Button}
          onClick={() => {
            console.log("Выбранные места:", selectedSeats);
          }}
        >
          Купить
        </button>
      </div>
    </div>
  );
};

export default OrderInfo;
