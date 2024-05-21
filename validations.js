import { body } from "express-validator";

export const registerValidation = [
  body("fullName", "input min 4 symbol, max 15 symbol").isLength({ min: 4, max: 15 }),
  body("email", "Is not email").isEmail(),
  body("password", "input min 4 symbol, max 15 symbol").isLength({ min: 4, max: 15 }),
];

export const loginValidation = [
  body("email", "Is not email").isEmail(),
  body("password", "input min 4 symbol, max 15 symbol").isLength({ min: 4, max: 15 }),
];
