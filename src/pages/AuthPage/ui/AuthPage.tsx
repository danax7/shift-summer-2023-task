import React, { useState } from "react";

import s from "./AuthPage.module.scss";
import { url } from "../../../app/constants/requestUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [isAuth, setisAuth] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isSMS, setIsSMS] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSMS) {
      await onSubmitOtp(phone);
    }
    if (isSMS) {
      await onSubmitAuth(phone, otpCode);
    }
  };

  const onSubmitOtp = async (phone: string) => {
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

  const onSubmitAuth = async (phone: string, otpCode: string) => {
    try {
      const response = await axios.post(url + "/users/signin", {
        phone: phone,
        code: Number(otpCode),
      });

      console.log(response.data.success);
      console.log(response.status);
      console.log(isAuth);
      if (response.data.success === true) {
        localStorage.setItem("authToken", response.data.token);
        setisAuth(true);
        console.log(response.data.success);
        console.log(response.data);
        console.log(isAuth);
        navigate("/profile");
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
              <label htmlFor="otp_code">Код из SMS</label>
              <input
                type="text"
                id="otp_code"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
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
