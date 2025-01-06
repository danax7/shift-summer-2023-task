import { Link } from "react-router-dom";
import s from "./LoginButtons.module.scss";
import { useAuth } from "../../../../global/AuthContext/AuthContext";

const LoginButtons = () => {
  const { isAuth, setIsAuth, onAuthPage } = useAuth();

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setIsAuth(false);
  };
  return (
    <div className={s.loginButtonWrapper}>
      {onAuthPage && <div></div>}

      {!onAuthPage && (
        <div>
          {isAuth ? (
            <div className={s.buttonsBlock}>
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
      )}
    </div>
  );
};

export default LoginButtons;
