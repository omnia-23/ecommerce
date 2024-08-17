import slugify from "slugify";
import Product from "../../../../DB/models/Product.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import AppError from "../../../utils/AppError.js";
import ApiFeatures from "../../../utils/apiFeatures.js";

export const getProducts = asyncHandler(async (req, res, next) => {
  let ApiFeature = new ApiFeatures(Product.find(), req.query);
  ApiFeature = ApiFeature.pagination().sort().fields().search().filter();
  const products = await ApiFeature.mongooseQuery.populate([
    {
      path: "category",
    },
    {
      path: "subCategory",
    },
    {
      path: "brand",
    },
  ]);

  return products.length == 0
    ? next(new AppError("not found products", 404))
    : res.status(200).json({ message: "success", products, status: 200 });
  // pageNumber: page, size: limit,
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params._id).populate([
    {
      path: "category",
    },
    {
      path: "subCategory",
    },
    {
      path: "brand",
    },
  ]);
  return !product
    ? next(new AppError("not found product", 404))
    : res.status(200).json({ message: "success", product, status: 200 });
});

export const addProduct = asyncHandler(async (req, res, next) => {
  req.body.mainImage = req.files?.mainImage[0]?.filename;
  req.body.coverImages = req.files?.coverImages.map(
    (element) => element.filename
  );
  req.body.slug = slugify(req.body.title);
  const category = await Product.create(req.body);
  return res.status(201).json({ message: "success", category, status: 201 });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  if (req.files?.mainImage?.length) {
    req.body.mainImage = req.files?.mainImage[0]?.filename;
  }
  req.body.coverImages = req.files?.coverImages?.map(
    (element) => element.filename
  );
  req.body.slug = slugify(req.body.title);
  const product = await Product.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
  });
  return !product
    ? next(new AppError("not found product", 404))
    : res.status(200).json({ message: "success", product, status: 200 });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params._id);
  return !product
    ? next(new AppError("not found product", 404))
    : res.status(200).json({ message: "success", product, status: 200 });
});
