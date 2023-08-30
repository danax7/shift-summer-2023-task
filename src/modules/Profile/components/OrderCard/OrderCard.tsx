interface OrderCardProps {
  seance: Seance;
  tickets: Ticket[];
  filmIdIndex: number;
}

const OrderCard = ({ seance, tickets, filmIdIndex }: OrderCardProps) => {
  return (
    <div>
      <h3>Фильм:{tickets[filmIdIndex].filmId}</h3>
      <p>Date: {seance.date}</p>
      <p>Time: {seance.time}</p>
      <h4>Tickets:</h4>
      <ul>
        {tickets.map((ticket, index) => (
          <li key={index}>
            Row: {ticket.row}, Column: {ticket.column}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderCard;
