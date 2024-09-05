const express = require('express');
const router = express.Router();
const Modulo = require('../models/model'); 

router.get('/', async (req, res) => {
    try {
        // Extraer parámetros de consulta
        const { etiquetas, nivel } = req.query;

        // Construir el filtro dinámico
        let filtro = {};

        if (etiquetas) {
            filtro.etiquetas = { $in: etiquetas.split(',') }; // Busca módulos que contengan alguna de las etiquetas
        }

        if (nivel) {
            filtro.nivel = nivel; // Filtra por nivel de conocimiento
        }

        const modulos = await Modulo.find(filtro);
        res.json(modulos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const modulo = new Modulo({
        imagen: req.body.imagen,
        titulo: req.body.titulo,
        temas: req.body.temas,
        etiquetas: req.body.etiquetas,  
        nivel: req.body.nivel           
    });

    try {
        const nuevoModulo = await modulo.save();
        res.status(201).json(nuevoModulo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const modulo = await Modulo.findById(req.params.id);
        if (modulo == null) {
            return res.status(404).json({ message: 'Módulo no encontrado' });
        }
        res.json(modulo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.put('/:id', async (req, res) => {
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
        if (req.body.etiquetas != null) {
            modulo.etiquetas = req.body.etiquetas;
        }
        if (req.body.nivel != null) {
            modulo.nivel = req.body.nivel;
        }

        const moduloActualizado = await modulo.save();
        res.json(moduloActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:moduloId/temas/:temaId', async (req, res) => {
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
});


router.delete('/:id', async (req, res) => {
    try {
        const deleteModulo = await Modulo.findByIdAndDelete(req.params.id);
        if (deleteModulo == null) {
            return res.status(404).json({ message: 'Módulo no encontrado' });
        }
        res.status(200).json({ message: 'Módulo eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
