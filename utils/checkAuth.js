import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "secretTokenKey");

      req.userId = decoded._id;

      next();
    } catch (err) {
      res.status(403).json({
        message: "no access", // ???
      });
    }
  } else {
    res.status(403).json({
      message: "no access", // ???
    });
  }
};
