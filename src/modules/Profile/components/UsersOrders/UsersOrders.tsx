import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../../../app/constants/requestUrl";
import OrderCard from "../OrderCard/OrderCard";

const UsersOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

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
          console.log(response.data);
          if (response.data.success === true) {
            setOrders(response.data.orders);
          }
        }
      } catch (error) {
        console.error("Ошибка при получении заказов:", error);
      }
    };

    getOrders();
  }, []);

  return (
    <div>
      {orders.map((order, index) => (
        <OrderCard
          key={index}
          filmIdIndex={index}
          seance={order.tickets[index].seance}
          tickets={order.tickets}
        />
      ))}
    </div>
  );
};

export default UsersOrders;
