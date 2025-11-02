import { auth } from '../../firebase/admin';

export const registerUser = async (email: string, password: string) => {
  try {
    const user = await auth.createUser({
      email,
      password,
    });

    // Aquí podrías agregar más lógica, por ejemplo, crear perfil en Firestore
    return {
      uid: user.uid,
      email: user.email,
    };
  } catch (error) {
    throw new Error(`Error creando usuario: ${(error as Error).message}`);
  }
};

// Login en Firebase Admin no se realiza directamente,
// normalmente el frontend obtiene el token ID de Firebase Authentication.
// Aquí podrías agregar lógica de verificación de token o refresco si lo deseas.
export const loginUser = async (idToken: string) => {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
  } catch (error) {
    throw new Error(`Error verificando token: ${(error as Error).message}`);
  }
};
