import React from "react";
import s from "./ProfilePage.module.scss";
import { useAuth } from "../../../global/AuthContext/AuthContext";

const ProfilePage = () => {
  const { isAuth } = useAuth();
  console.log(isAuth);
  return (
    <div>{isAuth ? <div>ProfilePage</div> : <div>Вы не авторизованы</div>}</div>
  );
};

export default ProfilePage;
