import User from "../../DB/models/User";
import AppError from "../utils/AppError";

export const checkEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) next(new AppError("email is exist"), 400);
  next();
});
