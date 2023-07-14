import React, { useState } from "react";
import s from "./PaymentForm.module.scss";

const PaymentForm = ({ onSubmit, onCancel }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const paymentData = {
      firstname: firstName,
      lastname: lastName,
      middlename: middleName,
      phone: phone,
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      cvv: cvv,
    };

    onSubmit(paymentData);
  };

  return (
    <div className={s.PaymentForm}>
      <form onSubmit={handleSubmit}>
        <h2 className={s.title}>Введите ваши данные</h2>
        <div className={s.FieldGroup}>
          <label htmlFor="firstName">Имя</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastName">Фамилия</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="middleName">Отчество</label>
          <input
            type="text"
            id="middleName"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <label htmlFor="phone">Телефон</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="cardNumber">Номер карты</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <label htmlFor="expiryDate">Срок</label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </div>

        <div className={s.Actions}>
          <button type="submit" className={s.SubmitButton}>
            Оплатить
          </button>
          <button type="button" className={s.CancelButton} onClick={onCancel}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
