import asyncHandler from "../../../middleware/asyncHandler.js";
import AppError from "../../../utils/AppError.js";
import Coupon from "../../../../DB/models/Coupon.js";

export const getCoupons = asyncHandler(async (req, res, next) => {
  const coupons = await Coupon.find();
  return coupons.length == 0
    ? next(new AppError("not found coupons", 404))
    : res.status(200).json({ message: "success", coupons, status: 200 });
});

export const addCoupon = asyncHandler(async (req, res, next) => {
  const exist = await Coupon.findOne({ code: req.body.code });
  if (exist) return next(new AppError("coupon already exist", 400));
  const coupon = await Coupon.create(req.body);
  return res.status(201).json({ message: "success", coupon, status: 201 });
});

export const updateCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
  });
  return !coupon
    ? next(new AppError("not found brand", 404))
    : res.status(200).json({ message: "success", coupon, status: 200 });
});

export const deleteCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findByIdAndDelete(req.params._id);
  return !coupon
    ? next(new AppError("not found coupon", 404))
    : res.status(200).json({ message: "success", coupon, status: 200 });
});
