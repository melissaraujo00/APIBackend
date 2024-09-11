import { Router } from 'express';
import Login from '../models/modelLogin.js';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/authMiddleware.js';
import { validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import validateLogin from '../validations/userValidation.js';

dotenv.config();

const router = Router();

router.get('/usuario', authMiddleware, async (req, res) => {
    try {
        const modulos = await Login.find({}, { password: 0 }); // Excluye el campo password
        res.json(modulos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener los usuarios.' });
    }
});

router.get('/usuario/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await Login.findById(id, { password: 0 }); // Excluye el campo password
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
});

router.post('/register', validateLogin, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { user, email, password, roles = ['user'] } = req.body; // Asigna "user" si no hay roles

    try {
        let userExists = await Login.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await Login.encryptPassword(password);

        await Login.create({
            user,
            email,
            password: hashedPassword,
            roles
        });

        res.status(200).json({ msg: 'User registered successfully' });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.put('/usuario/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    try {
        let usuario = await Login.findById(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (req.body.user != null) {
            usuario.user = req.body.user;
        }
        if (req.body.email != null) {
            usuario.email = req.body.email;
        }
        if (req.body.password != null) {
            usuario.password = await Login.encryptPassword(req.body.password);
        }
        if (req.body.roles != null) {
            usuario.roles = req.body.roles;
        }

        usuario = await usuario.save();

        res.json(usuario);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error al actualizar el usuario' });
    }
});

router.delete('/usuario/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await Login.findById(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await Login.deleteOne({ _id: id });

        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
});

const loginLimiter = rateLimit({
    windowMs: 30 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts from this IP, please try again later.'
});

router.post('/signin', loginLimiter, async (req, res) => {
    const userFound = await Login.findOne({ email: req.body.email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const matchPassword = await Login.comparePassword(req.body.password, userFound.password);
    if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid password' });

    const payload = {
        user: {
            id_user: userFound._id,
            roles: userFound.roles
        }
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        }
    );
});

export default router;
