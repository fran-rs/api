import { Router } from 'express';
import { createProduct, getProducts } from './productController';

const router = Router();

// Endpoint para crear un producto
router.post('/', createProduct);

// Endpoint para obtener todos los productos
router.get('/', getProducts);

// Puedes agregar más endpoints de productos aquí, por ejemplo update, delete
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

export default router;
