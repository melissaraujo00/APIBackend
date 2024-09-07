import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const loginSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(password) {
                return passwordRegex.test(password);
            },
            message: "La contraseña debe contener al menos 8 caracteres, incluyendo un número, una letra mayúscula, una letra minúscula y un caracter especial"
        }
    },
    roles: {
        type: [String], // Array de strings para representar roles
        enum: ['user', 'admin', 'profesor'], // Roles posibles
        default: 'user' // Valor por defecto si no se especifica un rol
    }
});

// Método estático para encriptar la contraseña
loginSchema.statics.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Método estático para comparar contraseñas
loginSchema.statics.comparePassword = async function(password, receivedPassword) {
    return await bcrypt.compare(password, receivedPassword);
};

// Creación del modelo
const Login = mongoose.model('login', loginSchema);

export default Login;
