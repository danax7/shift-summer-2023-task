import React, { useState } from "react";
import { Seance } from "../../types/ISchedule";
import s from "./OrderInfo.module.scss";
import { IMovie } from "../../../MovieList/components/MovieCard/types/IMovie";
import PaymentForm from "../../../PaymentForm/PaymentForm";
import ConfirmationModal from "../../../PaymentForm/components/ConfirmationModal/ConfirmationModal";

interface OrderInfoProps {
  seance: Seance;
  selectedSeats: number[];
  totalPrice: number;
  handleClearSeats: () => void;
  film: IMovie;
  selectedDate: string;
}

const OrderInfo = ({
  seance,
  selectedSeats,
  totalPrice,
  handleClearSeats,
  film,
  selectedDate,
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

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleBuyClick = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = (paymentData) => {
    setShowPaymentForm(false);
    setShowConfirmationModal(true);
  };

  const handleConfirmationClose = () => {
    handleClearSeats();
    setShowConfirmationModal(false);
  };

  return (
    <div className={s.OrderInfo}>
      <div className={s.MovieInfo}>
        <p className={s.SeanceHall}>Зал: {seance.hall.name}</p>
        <p className={s.FilmText}>Фильм: </p>
        <p className={s.info}>{film.name}</p>
        <p className={s.FilmText}>Дата и время сеанса:</p>
        <p className={s.info}>
          {selectedDate} {seance.time}
        </p>
        <p className={s.FilmText}>Места: </p>
        <p className={s.info}>{formatSelectedSeats()}</p>
      </div>
      <div className={s.TotalPrice}>
        <p className={s.info}>Сумма: {totalPrice}</p>
        <button className={s.Button} onClick={handleClearSeats}>
          Очистить
        </button>
        <button className={s.Button} onClick={handleBuyClick}>
          Купить
        </button>
      </div>

      {showPaymentForm && (
        <PaymentForm
          onSubmit={handlePaymentSubmit}
          onCancel={() => setShowPaymentForm(false)}
        />
      )}

      {showConfirmationModal && (
        <ConfirmationModal
          filmName={film.name}
          tickets={selectedSeats.map((seat) => ({
            filmId: film.id,
            row: Math.floor((seat - 1) / seance.hall.places[0].length) + 1,
            column: ((seat - 1) % seance.hall.places[0].length) + 1,
            seance: {
              date: selectedDate,
              time: seance.time,
            },
            phone: "",
          }))}
          onClose={handleConfirmationClose}
        />
      )}
    </div>
  );
};

export default OrderInfo;
