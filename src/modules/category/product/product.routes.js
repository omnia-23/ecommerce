import { Router } from "express";
import * as productController from './controller/product.controller.js'
import uploadFile, { customValidation } from "../../middleware/uploadFile.js";
const router = Router()
router.get('/', productController.getProducts)
    .get('/:_id', productController.getProduct)
    .post('/', uploadFile(customValidation.images, 'product').fields([{ name: 'mainImage', maxCount: 1 }, { name: 'coverImages', maxCount: 5 }]), productController.addProduct)
    .put('/:_id', uploadFile(customValidation.images, 'product').fields([{ name: 'mainImage', maxCount: 1 }, { name: 'coverImages', maxCount: 5 }]), productController.updateProduct)
    .delete('/:_id', productController.deleteProduct)


export default router;