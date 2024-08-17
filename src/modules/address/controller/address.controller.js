import asyncHandler from "../../../middleware/asyncHandler.js";
import AppError from "../../../utils/AppError.js";

import User from "../../../../DB/models/User.js";
export const getAddress = asyncHandler(async (req, res, next) => {
  const address = await User.find();
  return address.length == 0
    ? next(new AppError("not found address", 404))
    : res.status(200).json({ message: "success", address, status: 200 });
});

export const addAddress = asyncHandler(async (req, res, next) => {
  const address = await User.findByIdAndUpdate(
    req.user.id,
    {
      $push: { address: req.body.address },
    },
    { new: true }
  );
  return res.status(201).json({ message: "success", address, status: 201 });
});

export const deleteAddress = asyncHandler(async (req, res, next) => {
  const address = await User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: { address: { _id: req.params.id } },
    },
    { new: true }
  );
  return !address
    ? next(new AppError("not found address", 404))
    : res.status(200).json({ message: "success", address, status: 200 });
});
