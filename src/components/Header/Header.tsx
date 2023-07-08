import Logo from "./items/Logo/Logo";
import LoginButton from "./items/LoginButton/LoginButton";
import "./Header.scss";

const Header = () => {
  return (
    <div className="headerWrapper">
      <Logo />
      <LoginButton />
    </div>
  );
};

export default Header;
