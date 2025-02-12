import Modulo from "../models/model.js";
import authMiddleware from "../middleware/authMiddleware.js"


/**
 * @description get all modules
 * @route GET /api/modulos
 */
export const listadoModulos = async (req, res) => {
    try {
        // Extraer parámetros de consulta
        const {nivel} = req.query;

        // Construir el filtro dinámico
        let filtro = {};

        if (nivel) {
            filtro.nivel = nivel; // Filtra por nivel de conocimiento
        }

        const modulos = await Modulo.find(filtro);
        res.json(modulos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

/**
 * @description store module
 * @route POST /api/modulos
 */
export const guardarModulo = [authMiddleware, async (req, res) => {

    const modulo = new Modulo({
        imagen: req.body.imagen,
        titulo: req.body.titulo,
        temas: req.body.temas,
        nivel: req.body.nivel,
        author: req.user.id_user
    });

    try {
        const nuevoModulo = await modulo.save();
        res.status(201).json(nuevoModulo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}]

/**
 * @description get single module
 * @route GET /api/modulos/:id
 * @param {string} id
 */
export const obtenerModulo = async (req, res) => {

    try {
        const modulo = await Modulo.findById(req.params.id);
        if (modulo == null) {
            return res.status(404).json({ message: 'Módulo no encontrado' });
        }
        res.json(modulo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}





/**
 * @description update module
 * @route PUT /api/modulos/:id
 * @param {string} id
 */
export const editarModulo = async (req, res) => {
    try {
        const modulo = await Modulo.findById(req.params.id);
        if (modulo == null) {
            return res.status(404).json({ message: 'Módulo no encontrado' });
        }
        if (req.body.imagen != null) {
            modulo.imagen = req.body.imagen;
        }
        if (req.body.titulo != null) {
            modulo.titulo = req.body.titulo;
        }
        if (req.body.temas != null) {
            modulo.temas = req.body.temas;
        }
        if (req.body.nivel != null) {
            modulo.nivel = req.body.nivel;
        }

        const moduloActualizado = await modulo.save();
        res.json(moduloActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

/**
 * @description delete module
 * @route DELETE /api/modulos/:id
 * @param {string} id
 */
export const eliminarModulo = async (req, res) => {

    try {
        const deleteModulo = await Modulo.findByIdAndDelete(req.params.id);
        if (deleteModulo == null) {
            return res.status(404).json({ message: 'Módulo no encontrado' });
        }
        res.status(200).json({ message: 'Módulo eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * @description update topics by module
 * @route PUT /api/modulos/:moduloId/temas/:temaId
 * @param {string} moduloId
 * @param {string} temaId
 */
export const actualizarTemasDelModulo = async (req, res) => {

    try {
        const { moduloId, temaId } = req.params;
        const actualizaciones = req.body;

        let camposParaActualizar = {};

        if (actualizaciones.nombre != null) {
            camposParaActualizar['temas.$.nombre'] = actualizaciones.nombre;
        }
        if (actualizaciones.descripcion != null) {
            camposParaActualizar['temas.$.descripcion'] = actualizaciones.descripcion;
        }
        if (actualizaciones.urlvideos != null) {
            camposParaActualizar['temas.$.urlvideos'] = actualizaciones.urlvideos;
        }
        const resultado = await Modulo.findOneAndUpdate(
            { _id: moduloId, 'temas._id': temaId },
            { $set: camposParaActualizar },
            { new: true, runValidators: true }
        );

        if (!resultado) {
            return res.status(404).json({ message: 'Tema no encontrado' });
        }

        res.json({ message: 'Tema actualizado exitosamente', tema: resultado });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
