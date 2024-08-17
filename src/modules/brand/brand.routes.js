import { Router } from "express";
import * as brandController from './controller/brand.controller.js'
const router = Router()
router.get('/', brandController.getBrands)
    .get('/:_id', brandController.getBrand)
    .post('/', brandController.addBrand)
    .put('/:_id', brandController.updateBrand)
    .delete('/:_id', brandController.deleteBrand)
export default router;