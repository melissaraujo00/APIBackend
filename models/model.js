const mongoose = require('mongoose');

const urlVideoSchema = new mongoose.Schema({
    url: String 
});


const temaSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,  
    urlvideos: [urlVideoSchema] 
});

const moduloSchema = new mongoose.Schema({
    imagen:  String, 
    titulo:  String,  
    temas: [temaSchema], 
    etiquetas: [String],
    nivel: { type: String, enum: ['principiante', 'intermedio', 'avanzado'] } 
});

const Modulo = mongoose.model('modulos', moduloSchema);

module.exports = Modulo;
