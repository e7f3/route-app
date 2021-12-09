import Header from "../modules/Header.jsx";

// Основная разметка приложения

export default function Layout({ children }) {
  return (
    <div className="outer-wrapper">
      <div className="inner-wrapper">
        <Header />
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
