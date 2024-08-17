import { Router } from "express";
import * as subCategoryController from './controller/subCategory.controller.js'
const router = Router({ mergeParams: true })
router.get('/', subCategoryController.getSubCategories)
    .get('/:_id', subCategoryController.getSubCategory)
    .post('/', subCategoryController.addSubCategory)
    .put('/:_id', subCategoryController.updateSubCategory)
    .delete('/:_id', subCategoryController.deleteSubCategory)
export default router;