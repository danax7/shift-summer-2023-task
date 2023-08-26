import { Link } from "react-router-dom";
import s from "./loginButton.module.scss";
const LoginButton = () => {
  return (
    <div className={s.loginButtonWrapper}>
      <Link to={`/auth`} className={s.loginButton}>
        Войти
      </Link>
    </div>
  );
};

export default LoginButton;
