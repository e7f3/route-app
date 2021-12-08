import Header from "../modules/Header.jsx";

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
