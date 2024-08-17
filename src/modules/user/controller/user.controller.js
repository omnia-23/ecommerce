import slugify from "slugify";
import Brand from "../../../../DB/models/Brand.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import AppError from "../../../utils/AppError.js";
import User from "../../../../DB/models/User.js";
import bcryptjs from "bcryptjs";

export const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);
  //   if (user && bcryptjs.compare(oldPassword))
  await user.updateOne(
    {
      password: bcryptjs.hashSync(newPassword, 10),
      passwordChanged: new Date(),
    },
    { new: true }
  );
  return res.status(201).json({ message: "success", user, status: 201 });
});
