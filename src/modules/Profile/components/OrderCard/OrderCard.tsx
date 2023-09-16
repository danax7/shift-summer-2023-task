import axios from "axios";
import { useState } from "react";
import { url } from "../../../MovieList/constants/requestUrl";
import s from "./OrderCard.module.scss";
interface OrderCardProps {
  seanceDate: string;
  seanceTime: string;
  filmName: string;
  tickets: Ticket[];
  orderNumber: number;
  status: string;
  orderId: string;
}

const OrderCard = ({
  seanceDate,
  seanceTime,
  filmName,
  tickets,
  orderNumber,
  status,
  orderId,
}: OrderCardProps) => {
  const [orderStatus, setOrderStatus] = useState(status);
  const cancelOrder = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      console.log(token);
      if (token) {
        const response = await axios.put(
          url + "/cinema/orders/cancel",
          {
            orderId: orderId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          setOrderStatus("CANCELLED");
        }
      }
    } catch (error) {
      console.error("Ошибка при отмене заказа:", error);
    }
  };

  return (
    <div className={s.OrderCard}>
      <div className={s.OrderCardWrapper}>
        <div className={s.TimeRow}>
          <p>{seanceDate}</p>
          <p>{seanceTime}</p>
        </div>
        <h3>Фильм: {filmName}</h3>
        <ul>
          {tickets.map((ticket, index) => (
            <li key={index}>
              Row: {ticket.row}, Column: {ticket.column}
            </li>
          ))}
        </ul>
        <div className={s.StatusRow}>
          <p className={status === "PAYED" ? s.payed : s.cancelled}>
            {status === "PAYED" ? "оплачен" : "отменен"}
          </p>
          <p className={s.orderNumber}>Код билета: {orderNumber}</p>
        </div>
        {/* <p>Total price: {tickets[filmIdIndex].totalPrice}</p> */}
        <div className={s.CancelButtonWrapper}>
          {orderStatus === "PAYED" && (
            <button className={s.CancelButton} onClick={cancelOrder}>
              Отменить заказ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
