// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { auth } from '../firebase/admin';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const idToken = authHeader.split(' ')[1];
    const decodedToken = await auth.verifyIdToken(idToken);

    // Adjunta la info del usuario al request
    (req as any).user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido', error: (error as Error).message });
  }
};
