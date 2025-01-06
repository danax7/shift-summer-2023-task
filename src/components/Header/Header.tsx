import Logo from "./items/Logo/Logo";
import LoginButtons from "./items/LoginButton/LoginButton";
import "./Header.scss";

const Header = () => {
  return (
    <div className="headerWrapper">
      <Logo />
      <LoginButtons />
    </div>
  );
};

export default Header;
