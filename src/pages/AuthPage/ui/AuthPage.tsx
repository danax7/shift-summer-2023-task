import React, { useState } from "react";
import s from "./AuthPage.module.scss";
import { url } from "../../../app/constants/requestUrl";
import axios from "axios";

const AuthPage = () => {
  const [phone, setPhone] = useState("");
  const [SMS, setSMS] = useState("");
  const [isSMS, setIsSMS] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(phone);
  };

  const onSubmit = async (phone: string) => {
    try {
      const response = await axios.post(url + "/auth/otp", {
        phone: phone,
      });
      console.log(response.data);
      if (response.data.success === true) {
        setIsSMS(true);
        console.log(response.data.retryDelay);
      }
    } catch (error) {
      console.error("Error during auth:", error);
    }
  };

  return (
    <div className={s.PaymentForm}>
      <form onSubmit={handleSubmit}>
        <h2 className={s.title}>Авторизация</h2>
        <div className={s.FieldGroup}>
          <div className={s.inputAndLabelBlock}>
            <label htmlFor="phone">Номер телефона*</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {isSMS && (
            <div className={s.inputAndLabelBlock}>
              <label htmlFor="SMS_code">Код из SMS</label>
              <input
                type="text"
                id="SMS_code"
                value={SMS}
                onChange={(e) => setSMS(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className={s.Actions}>
          <button type="submit" className={s.SubmitButton}>
            Продолжить
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
