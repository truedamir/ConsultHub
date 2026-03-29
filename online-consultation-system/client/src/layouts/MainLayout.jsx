import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MainLayout({ children }) {
  const { user, logoutUser, isAuthenticated } = useAuth();

  return (
    <div className="app">
      <header className="header">
        <div className="container nav">
          <Link to="/" className="logo">
            ConsultHub
          </Link>

          <nav className="nav-links">
            <Link to="/">Главная</Link>

            {isAuthenticated ? (
  <>
    <Link to="/create">Создать вопрос</Link>
    <Link to="/my-questions">Мои вопросы</Link>
    <Link to="/profile">Профиль</Link>
    <button className="logout-btn" onClick={logoutUser}>
      Выйти
    </button>
    <span className="user-name">{user?.firstName}</span>
  </>
) : (
              <>
                <Link to="/login">Вход</Link>
                <Link to="/register">Регистрация</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="main container">{children}</main>
    </div>
  );
}