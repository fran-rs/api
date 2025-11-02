// src/features/products/productController.ts
import { Request, Response } from 'express';
import * as productService from './productService';

// Crear un nuevo producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.uid; // Obtenido desde verifyToken middleware
    const { name, description, price } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const product = await productService.createProduct({
      name,
      description,
      price,
      userId,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Obtener todos los productos
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
