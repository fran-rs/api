import { db } from '../../firebase/admin';

export interface Product {
  name: string;
  description: string;
  price: number;
  userId: string;
  createdAt?: Date;
}

// Crear un producto
export const createProduct = async (product: Product) => {
  try {
    const docRef = db.collection('products').doc(); // genera un ID automáticamente
    const newProduct = {
      ...product,
      createdAt: new Date(),
    };
    await docRef.set(newProduct);
    return { id: docRef.id, ...newProduct };
  } catch (error) {
    throw new Error(`Error creando producto: ${(error as Error).message}`);
  }
};

// Obtener todos los productos
export const getAllProducts = async () => {
  try {
    const snapshot = await db.collection('products').orderBy('createdAt', 'desc').get();
    const products: (Product & { id: string })[] = [];
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...(doc.data() as Product) });
    });
    return products;
  } catch (error) {
    throw new Error(`Error obteniendo productos: ${(error as Error).message}`);
  }
};
