import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/authService";

export default function ProfilePage() {
  const { user, token } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile(
        { firstName, lastName, password },
        token
      );

      setMessage("Профиль обновлён ✅");
    } catch (error) {
      console.error(error);
      setMessage("Ошибка обновления ❌");
    }
  };

  return (
    <MainLayout>
      <div className="form-card">
        <h2>Профиль</h2>

        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Фамилия"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="password"
            placeholder="Новый пароль (необязательно)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn">
            Сохранить
          </button>
        </form>
      </div>
    </MainLayout>
  );
}