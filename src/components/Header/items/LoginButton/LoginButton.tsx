import { Link } from "react-router-dom";
import s from "./loginButton.module.scss";
import { useAuth } from "../../../../global/AuthContext/AuthContext";

const LoginButton = () => {
  const { isAuth, setIsAuth } = useAuth();

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setIsAuth(false);
  };

  return (
    <div className={s.loginButtonWrapper}>
      {isAuth ? (
        <div>
          <button className={s.loginButton} onClick={handleLogout}>
            Выйти
          </button>
          <Link to={`/profile`} className={s.loginButton}>
            профиль
          </Link>
        </div>
      ) : (
        <Link to={`/auth`} className={s.loginButton}>
          Войти
        </Link>
      )}
    </div>
  );
};

export default LoginButton;
