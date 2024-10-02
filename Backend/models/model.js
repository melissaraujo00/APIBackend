import mongoose from 'mongoose';

const urlVideoSchema = new mongoose.Schema({
    descripcion: String,
    url: String
});


const temaSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    urlvideos: [urlVideoSchema]
});

const moduloSchema = new mongoose.Schema({
    imagen: String,
    titulo: String,
    temas: [temaSchema],
    nivel: { type: String, enum: ['principiante', 'intermedio', 'avanzado'] },
    author: {
        type: String,
        required: true,
    }
});

const Modulo = mongoose.model('modulos', moduloSchema);

export default Modulo;
