import s from "./loginButton.module.scss";
const LoginButton = () => {
  return (
    <div className={s.loginButtonWrapper}>
      <button className={s.loginButton}>Войти</button>
    </div>
  );
};

export default LoginButton;
