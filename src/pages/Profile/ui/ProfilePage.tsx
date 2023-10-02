import s from "./ProfilePage.module.scss";
import { useAuth } from "../../../global/AuthContext/AuthContext";
import UsersOrders from "../../../modules/Profile/components/UsersOrders/UsersOrders";

const ProfilePage = () => {
  const { isAuth } = useAuth();
  return (
    <div>
      <h3 className={s.title}>Личный кабинет</h3>
      {isAuth ? <UsersOrders /> : <div>Вы не авторизованы</div>}
    </div>
  );
};

export default ProfilePage;
