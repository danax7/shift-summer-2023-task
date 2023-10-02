import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../../../app/constants/requestUrl";
import OrderCard from "../OrderCard/OrderCard";
import s from "./UsersOrders.module.scss";

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
          if (response.data.success) {
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
      <h3 className={s.title}>Действующие билеты</h3>
      {orders.map((order, index) =>
        order.status === "PAYED" ? (
          <OrderCard
            key={index}
            seanceDate={order.tickets[0]?.seance.date}
            seanceTime={order.tickets[0]?.seance.time}
            filmName={order.tickets[0]?.filmId}
            tickets={order.tickets}
            orderNumber={order.orderNumber}
            status={order.status}
            orderId={orders[index]._id}
          />
        ) : null
      )}
    </div>
  );
};

export default UsersOrders;
