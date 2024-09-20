import express from 'express';
import { listaUsuarios, usuarioId, resgistrarUsuario, inicioSesion, cierreSesion, mantenerPerfil, actulizarUsuario, eliminarUsuario } from '../controllers/moduleControllerLogin.js';

const router = express.Router();

//get all user
router.get( '/usuario', listaUsuarios);

//get a user
router.get( '/usuario/:id', usuarioId);

//post register user
router.post( '/register', resgistrarUsuario);

//post signin user
router.post('/signin', inicioSesion);

//post logout user
router.post('/logout', cierreSesion);

//get keep logged in
router.get('/profile', mantenerPerfil);

//put update user
router.put('/usuario/:id', actulizarUsuario);

//delete user
router.delete('/usuario/:id', eliminarUsuario);

export default router;
