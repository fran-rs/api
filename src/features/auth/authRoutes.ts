import { Router } from 'express';
import { register } from './authController';

const router = Router();

// Endpoint de registro
router.post('/register', register);

// Puedes agregar más endpoints de auth aquí, por ejemplo login, refresh token, etc.
// router.post('/login', login);

export default router;
