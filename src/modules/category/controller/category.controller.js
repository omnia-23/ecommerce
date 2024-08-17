import slugify from "slugify";
import Category from "../../../../DB/models/Category.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import AppError from "../../../utils/AppError.js";

export const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  return categories.length == 0
    ? next(new AppError("not found categories", 404))
    : res.status(200).json({ message: "success", categories, status: 200 });
});

export const getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params._id);
  return !category
    ? next(new AppError("not found category", 404))
    : res.status(200).json({ message: "success", category, status: 200 });
});

export const addCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const slug = slugify(name);
  console.log(req.files);
  const category = await Category.create({
    name,
    slug,
    image: req.file?.filename,
  });
  return res.status(201).json({ message: "success", category, status: 201 });
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const slug = slugify(name);
  const category = await Category.findByIdAndUpdate(
    req.params._id,
    { name, slug, image: req.file?.filename },
    { new: true }
  );
  return !category
    ? next(new AppError("not found category", 404))
    : res.status(200).json({ message: "success", category, status: 200 });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params._id);
  return !category
    ? next(new AppError("not found category", 404))
    : res.status(200).json({ message: "success", category, status: 200 });
});
