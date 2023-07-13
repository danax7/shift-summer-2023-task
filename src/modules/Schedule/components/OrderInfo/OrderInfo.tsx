import React from "react";
import { Seance } from "../../types/ISchedule";
import s from "./OrderInfo.module.scss";

interface OrderInfoProps {
  seance: Seance;
  selectedSeats: number[];
  totalPrice: number;
  handleClearSeats: () => void;
}

const OrderInfo = ({
  seance,
  selectedSeats,
  totalPrice,
  handleClearSeats,
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
        <p>Фильм: {seance.movie}</p>
        <p>
          Дата и время сеанса: {seance.date} {seance.time}
        </p>
        <p>Места: {formatSelectedSeats()}</p>
      </div>
      <div className={s.TotalPrice}>
        <p>Общая сумма заказа: {totalPrice}</p>
        <button className={s.Button} onClick={handleClearSeats}>
          Очистить
        </button>
        <button
          className={s.Button}
          onClick={() => {
            console.log("Выбранные места:", selectedSeats);
          }}
        >
          Забронировать
        </button>
      </div>
    </div>
  );
};

export default OrderInfo;
