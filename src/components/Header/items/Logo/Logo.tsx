import { Link } from "react-router-dom";
import name from "../../../../assets/icons/Logo.png";
import s from "./Logo.module.scss";

const Logo = (): JSX.Element => (
  <div className={s.LogoWrapper}>
    <Link to={``} className={s.loginButton}>
      <img alt="logo" className={s.LogoImage} src={name} />
    </Link>
  </div>
);

export default Logo;
