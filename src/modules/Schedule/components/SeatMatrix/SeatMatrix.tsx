import { Seance } from "../../types/ISchedule";
import { useState } from "react";
import s from "./SeatMatrix.module.scss";

interface SeatMatrixProps {
  seance: Seance;
}

const SeatMatrix = ({ seance }: SeatMatrixProps) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatClick = (rowIndex: number, placeIndex: number) => {
    const seatNumber = rowIndex * seance.hall.places[0].length + placeIndex + 1;
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      } else {
        return [...prevSelectedSeats, seatNumber];
      }
    });
  };

  return (
    <div className={s.SeatMatrix}>
      <h4>Зал: {seance.hall.name}</h4>
      <div className={s.SeatGrid}>
        {seance.hall.places.map((row, rowIndex) => (
          <div key={rowIndex} className={s.SeatRow}>
            {row.map((place, placeIndex) => (
              <div
                key={placeIndex}
                className={
                  place === null
                    ? s.SeatUnavailable
                    : selectedSeats.includes(
                        rowIndex * seance.hall.places[0].length + placeIndex + 1
                      )
                    ? s.SeatSelected
                    : s.Seat
                }
                onClick={() => handleSeatClick(rowIndex, placeIndex)}
              >
                {place === null ? "-" : place.price}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={s.SelectedSeats}>
        <p>Выбранные места:</p>
        {selectedSeats.map((seat) => (
          <span key={seat} className={s.SelectedSeat}>
            {seat}
          </span>
        ))}
      </div>
      <div className={s.SelectedSeats}>
        <p>Очистить:</p>
        {(selectedSeats.length = 0)}
      </div>
      <button
        className={s.Button}
        onClick={() => {
          console.log("Booked seats:", selectedSeats);
        }}
      >
        Забронировать
      </button>
    </div>
  );
};

export default SeatMatrix;
