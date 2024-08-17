import slugify from "slugify"
import SubCategory from "../../../../DB/models/SubCategory.js"
import asyncHandler from "../../../middleware/asyncHandler.js"
import AppError from "../../../utils/AppError.js";

export const getSubCategories = asyncHandler(
    async (req, res, next) => {
        const subCategories = await SubCategory.find({ category: req.params._id }).populate('category');
        return subCategories.length == 0 ?
            next(new AppError("not found subCategories", 404)) :
            res.status(200).json({ message: "success", subCategories, status: 200 })
    }
)

export const getSubCategory = asyncHandler(
    async (req, res, next) => {
        const subCategory = await SubCategory.findById(req.params._id).populate('category');
        return !subCategory ?
            next(new AppError("not found subCategory", 404)) :
            res.status(200).json({ message: "success", subCategory, status: 200 })
    }
)

export const addSubCategory = asyncHandler(
    async (req, res, next) => {
        const { name, category } = req.body
        const slug = slugify(name)
        const subCategory = await SubCategory.create({ name, slug, category })
        return res.status(201).json({ message: "success", subCategory, status: 201 })
    }
)

export const updateSubCategory = asyncHandler(
    async (req, res, next) => {
        const { name, category } = req.body
        const slug = slugify(name)
        const subCategory = await SubCategory.findByIdAndUpdate(req.params._id, { name, slug, category }, { new: true })
        return !subCategory ?
            next(new AppError("not found subCategory", 404)) :
            res.status(200).json({ message: "success", subCategory, status: 200 })
    }
)

export const deleteSubCategory = asyncHandler(
    async (req, res, next) => {
        const subCategory = await SubCategory.findByIdAndDelete(req.params._id)
        return !subCategory ?
            next(new AppError("not found subCategory", 404)) :
            res.status(200).json({ message: "success", subCategory, status: 200 })
    }
)