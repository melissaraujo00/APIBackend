/*assignedTo: {
    type: String,
    description: "ID del usuario al que se asigna el roadmap",
    required : true
  },*/
import mongoose from 'mongoose';

// Definición del esquema de lecciones
const lessonSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  name: {
    type: String,
  },
  videoUrl: {
    type: String,
  }
});

// Definición del esquema de roadmap
const nameLessonsSchema = new mongoose.Schema({
  lessons: [lessonSchema],
  name: {
    type: String,
  }
});

const roadmapSchema = new mongoose.Schema({
    roadmap: [nameLessonsSchema]
})

// Creación del modelo de roadmap
const Roadmap = mongoose.model('Roadmap', roadmapSchema);

export default Roadmap;
