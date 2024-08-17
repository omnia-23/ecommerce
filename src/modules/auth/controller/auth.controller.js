import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../../../middleware/asyncHandler.js";
import User from "../../../../DB/models/User.js";
import AppError from "../../../utils/AppError.js";

export const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const hash = bcryptjs.hashSync(password, 8);
  const user = await User.create({
    name,
    email,
    password: hash,
  });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.HI);
  res.status(200).json({ message: "success", token, status: 200 });
});

export const Login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new AppError("in correct email or password"), 400);

  if (user && !bcryptjs.compareSync(password, user.password))
    return next(new AppError("in correct email or password"), 400);

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.HI);

  return res.status(201).json({ message: "success", token, status: 200 });
});
