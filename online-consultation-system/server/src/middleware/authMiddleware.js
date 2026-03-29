import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Нет токена, доступ запрещён",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Пользователь по токену не найден",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Неверный или просроченный токен",
      error: error.message,
    });
  }
};

export default protect;