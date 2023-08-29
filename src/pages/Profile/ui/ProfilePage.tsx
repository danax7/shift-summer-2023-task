import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../modules/MovieList/constants/requestUrl";
import s from "./ProfilePage.module.scss";

const ProfilePage = () => {
  const [isAuth, setisAuth] = useState(false);
  useEffect(() => {
    const getSession = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const response = await axios.get(url + "/users/session", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success === true) {
          setisAuth(true);
          console.log(response.data);
        }
        console.log(response.headers);
      } catch (error) {
        console.error("Ошибка при получении сессии:", error);
      }
    };

    getSession();
  }, []);

  if (!isAuth) {
    return (
      <div>
        {/* <img src={loader} alt="Loading..." /> */}
        Вы не авторизованы
      </div>
    );
  }

  return <div>ProfilePage</div>;
};

export default ProfilePage;
