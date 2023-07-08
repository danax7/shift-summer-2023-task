import name from "../../../../assets/icons/Logo.png";
import s from "./Logo.module.scss";

const Logo = (): JSX.Element => (
  <div className={s.LogoWrapper}>
    <img alt="logo" className={s.LogoImage} src={name} />
  </div>
);

export default Logo;
