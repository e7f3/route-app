import Logo from "../elements/Logo.jsx";
import RouteMode from "../elements/RouteMode.jsx";
import TravelMode from "../elements/TravelMode.jsx";

// Компонент - header страницы

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Logo className="header__logo" />
        <RouteMode className="header__route-mode" />
      </div>
    </header>
  );
}
