import s from "./OrderCard.module.scss";
interface OrderCardProps {
  seanceDate: string;
  seanceTime: string;
  filmName: string;
  tickets: Ticket[];
  orderNumber: number;
  status: string;
}

const OrderCard = ({
  seanceDate,
  seanceTime,
  filmName,
  tickets,
  orderNumber,
  status,
}: OrderCardProps) => {
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
      </div>
    </div>
  );
};

export default OrderCard;
