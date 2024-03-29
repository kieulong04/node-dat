import express from 'express';
import { createProducts, deleteProducts, getDetailById, getProducts, updateProducts } from '../controller/product';

const router =  express.Router();


router.get(`/products`,getProducts)
router.get(`/products/:id`,getDetailById)
router.post(`/products`,createProducts)
router.put(`/products/:id`,updateProducts)
router.delete(`/products/:id`,deleteProducts)

export default router;