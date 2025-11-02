import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar rutas de features
import authRoutes from './features/auth/authRoutes';
import productRoutes from './features/products/productRoutes';

// Importar middleware
import { verifyToken } from './middleware/authMiddleware';

dotenv.config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use('/api/auth', authRoutes);

// Rutas protegidas (ejemplo con middleware)
app.use('/api/products', verifyToken, productRoutes);

// Ruta por defecto
app.get('/', (req, res) => {
  res.send('API corriendo correctamente');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
