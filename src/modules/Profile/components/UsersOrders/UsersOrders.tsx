import axios from "axios";
import { useEffect } from "react";
import { url } from "../../../../app/constants/requestUrl";

const UsersOrders = () => {
  useEffect(() => {
    const getOrders = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (token) {
          const response = await axios.get(url + "/cinema/orders", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.success === true) {
            console.log(response.data);
            // setIsAuth(true);
          }
        }
      } catch (error) {
        console.error("Ошибка при получении сессии:", error);
      }
      //   setOnAuthPage(location.pathname === "/auth");
    };

    getOrders();
  }, []);

  return <div>data</div>;
};

export default UsersOrders;
