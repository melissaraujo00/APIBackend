import { check } from 'express-validator';

const validateLogin = [

    check('user')
        .notEmpty()
        .withMessage('El nombre de usuario no debe estar vacío')
        .isLength({ min: 5, max: 255 })
        .withMessage('El nombre de usuario debe contener entre 5 y 255 carateres'),

    check('email')
        .isEmail()
        .withMessage('Debe ser una dirección de email válida')
        .isLength({ min: 5, max: 255 })
        .withMessage('El email debe contener entre 5 y 255 carateres'),

    check('password')
        .isString()
        .withMessage('La contraseña debe ser un string')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe contener mínimo 8 caracteres')
        .matches(/[A-Z]/)
        .withMessage('La contraseña debe contener al menos una letra mayúscula')
        .matches(/[a-z]/)
        .withMessage('La contraseña debe contener al menos una letra minúscula')
        .matches(/\d/)
        .withMessage('La contraseña debe contener al menos un dígito')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('La contraseña debe contener al menos un caracter especial')
];

export default validateLogin;
