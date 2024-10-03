import express from 'express';
import { listadoModulos, guardarModulo, obtenerModulo, editarModulo, eliminarModulo, actualizarTemasDelModulo } from '../controllers/moduleController.js';

const router = express.Router();

//get all modules
router.get('/', listadoModulos);

//store module
router.post('/', guardarModulo);

//get single module
router.get('/:id', obtenerModulo);

//Update module
router.put('/:id', editarModulo);

//Update topics by module
router.put('/:moduloId/temas/:temaId', actualizarTemasDelModulo);

//Delete modulo
router.delete('/:id', eliminarModulo);





export default router;
