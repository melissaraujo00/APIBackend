import { check, body } from 'express-validator';

const validateLogin = [

    check('user')
        .notEmpty()
        .withMessage('El nombre de usuario no debe estar vacío')
        .isLength({ min: 5, max: 255 })
        .withMessage('El nombre de usuario debe contener entre 5 y 255 caracteres'),

    check('email')
        .isEmail()
        .withMessage('Debe ser una dirección de email válida')
        .isLength({ min: 5, max: 255 })
        .withMessage('El email debe contener entre 5 y 255 caracteres'),

    body('password')
        .isString()
        .withMessage('La contraseña debe ser un string')
        .custom(value => {
            const errors = [];
            if (value.length < 8) {
                errors.push('mínimo 8 caracteres');
            }
            if (!/[A-Z]/.test(value)) {
                errors.push('una letra mayúscula');
            }
            if (!/[a-z]/.test(value)) {
                errors.push('una letra minúscula');
            }
            if (!/\d/.test(value)) {
                errors.push('un dígito');
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                errors.push('un carácter especial');
            }

            if (errors.length > 0) {
                throw new Error(`La contraseña debe contener ${errors.join(', ')}.`);
            }
            return true;
        })
];

export default validateLogin;
