import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;

  console.log(token);

  next();
};
