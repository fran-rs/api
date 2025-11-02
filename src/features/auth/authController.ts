import { Request, Response } from 'express';
import { registerUser } from './authService';

// Registro de usuario
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y password son requeridos' });
    }

    const user = await registerUser(email, password);
    res.status(201).json({ uid: user.uid, email: user.email });
  } catch (error) {
    console.error('Error registrando usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Ejemplo de login (opcional)
// export const login = async (req: Request, res: Response) => {
//   // Normalmente el login se maneja en el frontend obteniendo un ID token
//   res.status(200).json({ message: 'Login manejado en el frontend' });
// };
