import name from "../../../../assets/icons/Logo.png";

const Logo = (): JSX.Element => (
  <div className="LogoWrapper">
    <img alt="logo" className="logoIcon" src={name} />
    <p className="LogoWrapper"></p>
  </div>
);

export default Logo;
