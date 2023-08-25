import s from "./SuccessModal.module.scss";
import GreenCheck from "../../../../assets/icons/GreenCheck.png";

interface SuccessModalProps {
  onClose: () => void;
  filmName: string;
  selectedDate: string;
  selectedSeats: string;
  orderNumber: number;
}

const SuccessModal = (props: SuccessModalProps) => {
  console.log(props);
  return (
    <div className={s.SuccessModal}>
      <div className={s.Modal}>
        <h2 className={s.title}>Оплата прошла успешно!</h2>
        <div className={s.SuccessBlock}>
          <img alt="logo" className={s.LogoImage} src={GreenCheck} />
          <p className={s.ticketNumber}>Код билета</p>
          <p className={s.OrderNumber}>{props.orderNumber}</p>
        </div>
        <div className={s.InfoBlock}>
          <p className={s.text}>Фильм</p>
          <p className={s.info}>{props.filmName}</p>
          <p className={s.text}>Дата и время</p>
          <p className={s.info}>{props.selectedDate}</p>
          <p className={s.text}>Места</p>
          <p className={s.info}>{props.selectedSeats}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
