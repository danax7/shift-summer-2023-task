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

  const handleClearSeats = () => {
    setSelectedSeats([]);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedSeats.forEach((seat) => {
      const rowIndex = Math.floor((seat - 1) / seance.hall.places[0].length);
      const placeIndex = (seat - 1) % seance.hall.places[0].length;
      const place = seance.hall.places[rowIndex][placeIndex];
      if (place) {
        totalPrice += place.price;
      }
    });
    return totalPrice;
  };

  const formatSelectedSeats = () => {
    const formattedSeats: string[] = [];
    selectedSeats.forEach((seat) => {
      const rowIndex =
        Math.floor((seat - 1) / seance.hall.places[0].length) + 1;
      const placeIndex = ((seat - 1) % seance.hall.places[0].length) + 1;
      formattedSeats.push(`${rowIndex} ряд - ${placeIndex}`);
    });
    return formattedSeats.join(", ");
  };

  const selectedRow =
    selectedSeats.length > 0
      ? Math.floor((selectedSeats[0] - 1) / seance.hall.places[0].length) + 1
      : 0;

  return (
    <div className={s.SeatMatrix}>
      <div className={s.Screen}>Экран</div>
      <div className={s.SeatGrid}>
        {seance.hall.places[0].map((_, placeIndex) => (
          <div key={placeIndex} className={s.SeatColumn}>
            {seance.hall.places.map((row, rowIndex) => {
              const place = row[placeIndex];
              const seatNumber =
                rowIndex * seance.hall.places[0].length + placeIndex + 1;
              const isSelected = selectedSeats.includes(seatNumber);
              const isAvailable = place !== null;
              const isSeatSelected = isSelected && isAvailable;
              const isSeatUnavailable = place.type === "BLOCKED";
              const isSeatComfort = place.type === "COMFORT";
              const seatClassNames = `${s.Seat} ${
                isSeatSelected ? s.SeatSelected : ""
              } ${isSeatUnavailable ? s.SeatUnavailable : ""} ${
                isSeatComfort ? s.SeatComfort : ""
              }`;

              return (
                <div
                  key={rowIndex}
                  className={seatClassNames}
                  onClick={
                    place.type !== "BLOCKED"
                      ? () => handleSeatClick(rowIndex, placeIndex)
                      : null
                  }
                ></div>
              );
            })}
          </div>
        ))}
      </div>
      <div className={s.SelectedSeats}>
        <p>Выбранные места:</p>
        <span>{formatSelectedSeats()}</span>
      </div>
      <div className={s.SelectedSeats}>
        <p>Фильм:</p>
        {/* <span>{seance.movie}</span> */}
      </div>
      {selectedSeats.length > 0 && (
        <div className={s.SelectedSeats}>
          <p>Общая сумма заказа:</p>
          <span>{calculateTotalPrice()}</span>
        </div>
      )}
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
  );
};

export default SeatMatrix;
