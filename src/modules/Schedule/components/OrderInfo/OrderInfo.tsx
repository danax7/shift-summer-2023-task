import React, { useState } from "react";
import { Seance } from "../../types/ISchedule";
import s from "./OrderInfo.module.scss";
import { IMovie } from "../../../MovieList/components/MovieCard/types/IMovie";
import PaymentForm from "../../../PaymentForm/PaymentForm";
import ConfirmationModal from "../../../PaymentForm/components/ConfirmationModal/ConfirmationModal";
import axios from "axios";
import { url } from "../../../../app/constants/requestUrl";

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

  const handlePaymentSubmit = async (paymentData) => {
    try {
      const response = await axios.post(url + "/cinema/payment", {
        filmId: film.id,
        person: {
          firstname: paymentData.firstname,
          lastname: paymentData.lastname,
          middlename: paymentData.middlename,
          phone: paymentData.phone,
        },
        debitCard: {
          pan: paymentData.cardNumber,
          expireDate: paymentData.expiryDate,
          cvv: paymentData.cvv,
        },
        seance: {
          date: selectedDate,
          time: seance.time,
        },
        tickets: selectedSeats.map((seat) => ({
          row: Math.floor((seat - 1) / seance.hall.places[0].length) + 1,
          column: ((seat - 1) % seance.hall.places[0].length) + 1,
        })),
      });
      console.log(response.data);
      if (response.status === 200) {
        setShowPaymentForm(false);
        setShowConfirmationModal(true);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
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
    </div>
  );
};

export default OrderInfo;
