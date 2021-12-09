import Logo from "../elements/Logo.jsx";

// Компонент - header страницы

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Logo className="header__logo" />
      </div>
    </header>
  );
}
