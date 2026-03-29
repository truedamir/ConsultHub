import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

export default function NotFoundPage() {
  return (
    <MainLayout>
      <div className="not-found">
        <h1>404</h1>
        <p>Страница не найдена</p>
        <Link to="/" className="btn">
          На главную
        </Link>
      </div>
    </MainLayout>
  );
}