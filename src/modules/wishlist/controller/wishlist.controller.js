import asyncHandler from "../../../middleware/asyncHandler.js";
import AppError from "../../../utils/AppError.js";

import User from "../../../../DB/models/User.js";
export const getWishlist = asyncHandler(async (req, res, next) => {
  const wishlist = await User.find();
  return wishlist.length == 0
    ? next(new AppError("not found wishlist", 404))
    : res.status(200).json({ message: "success", wishlist, status: 200 });
});

export const addWishlist = asyncHandler(async (req, res, next) => {
  const brand = await User.findByIdAndUpdate(
    req.user.id,
    {
      $addToSet: { wishlist: req.body.product },
    },
    { new: true }
  );
  return res.status(201).json({ message: "success", brand, status: 201 });
});

export const deleteWishlist = asyncHandler(async (req, res, next) => {
  const brand = await User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: { wishlist: req.body.product },
    },
    { new: true }
  );
  return !brand
    ? next(new AppError("not found brand", 404))
    : res.status(200).json({ message: "success", brand, status: 200 });
});
