import { Router } from "express";
import subCategoryRouter from '../subCategory/subCategory.routes.js'
import * as categoryController from './controller/category.controller.js'
import uploadFile, { customValidation } from "../../middleware/uploadFile.js";
import validation from "../../middleware/validation.js";
import { addCategorySchema } from "./category.validation.js";
const router = Router()
router.get('/', categoryController.getCategories)
    .get('/:_id', categoryController.getCategory)
    .post('/', uploadFile(customValidation.images, 'category').single('image'), validation(addCategorySchema), categoryController.addCategory)
    .put('/:_id', uploadFile(customValidation.images, 'category').single('image'), categoryController.updateCategory)
    .delete('/:_id', categoryController.deleteCategory)
    .use('/:_id/subCategories', subCategoryRouter)


export default router;