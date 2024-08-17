import asyncHandler from "../../../middleware/asyncHandler.js";
import Review from "../../../../DB/models/Review.js";
import AppError from "../../../utils/AppError.js";
import roles from "../../../types/roles.js";

export const getReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find().populate("user");
  return reviews.length == 0
    ? next(new AppError("not found reviews", 404))
    : res.status(200).json({ message: "success", reviews, status: 200 });
});

export const addReview = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const exist = await Review.find({
    product: req.body.product,
    user: req.user.id,
  });
  if (exist.length > 0) {
    return next(new AppError("you already review this product", 400));
  }
  const review = await Review.create(req.body);
  return res.status(201).json({ message: "success", review, status: 201 });
});

export const updateReview = asyncHandler(async (req, res, next) => {
  const exist = await Review.findById(req.params.id);
  if (!exist) {
    return next(new AppError("not found", 404));
  }
  console.log(exist);
  if (exist.user.toString() === req.user.id || req.user.role === roles.admin) {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return !review
      ? next(new AppError("not found review", 404))
      : res.status(200).json({ message: "success", review, status: 200 });
  } else {
    return next(
      new AppError("you are not authorized to update this review", 403)
    );
  }
});

export const deleteReview = asyncHandler(async (req, res, next) => {
  const exist = await Review.findById(req.params.id);
  if (!exist) {
    return next(new AppError("not found", 404));
  }
  console.log(exist);
  if (exist.user.toString() === req.user.id || req.user.role === roles.admin) {
    const review = await Review.findByIdAndDelete(req.params.id);
    return !review
      ? next(new AppError("not found review", 404))
      : res.status(200).json({ message: "success", review, status: 200 });
  } else {
    return next(
      new AppError("you are not authorized to delete this review", 403)
    );
  }
});
