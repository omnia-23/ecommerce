import slugify from "slugify";
import Brand from "../../../../DB/models/Brand.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import AppError from "../../../utils/AppError.js";

export const getBrands = asyncHandler(async (req, res, next) => {
  const brands = await Brand.find();
  return brands.length == 0
    ? next(new AppError("not found brands", 404))
    : res.status(200).json({ message: "success", brands, status: 200 });
});

export const getBrand = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params._id);
  return !brand
    ? next(new AppError("not found brand", 404))
    : res.status(200).json({ message: "success", brand, status: 200 });
});

export const addBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const slug = slugify(name);
  const brand = await Brand.create({ name, slug });
  return res.status(201).json({ message: "success", brand, status: 201 });
});

export const updateBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const slug = slugify(name);
  const brand = await Brand.findByIdAndUpdate(
    req.params._id,
    { name, slug },
    { new: true }
  );
  return !brand
    ? next(new AppError("not found brand", 404))
    : res.status(200).json({ message: "success", brand, status: 200 });
});

export const deleteBrand = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findByIdAndDelete(req.params._id);
  return !brand
    ? next(new AppError("not found brand", 404))
    : res.status(200).json({ message: "success", brand, status: 200 });
});
