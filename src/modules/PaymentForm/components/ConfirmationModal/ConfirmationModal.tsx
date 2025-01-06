import React from "react";
import s from "./ConfirmationModal.module.scss";

const ConfirmationModal = ({ filmName, tickets, onClose }) => {
  const handleSubmit = () => {
    console.log(tickets);
  };

  return (
    <div className={s.ConfirmationModal}>
      <h2 className={s.Title}>Подтверждение оплаты</h2>
      <div className={s.Content}>
        <p>Фильм: {filmName}</p>
      </div>
      <div className={s.Actions}>
        <button className={s.SubmitButton} onClick={handleSubmit}>
          Оплатить
        </button>
        <button className={s.CancelButton} onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
