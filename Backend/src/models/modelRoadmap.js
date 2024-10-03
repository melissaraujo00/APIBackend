
import mongoose from 'mongoose';

// Definición del esquema de lecciones
const lessonSchema = new mongoose.Schema({
  description: {
    type: String
  },
  name: {
    type: String
  },
  videoUrl: {
    type: String
  }
});

const nameLessonsSchema = new mongoose.Schema({
  lessons: [lessonSchema],
  name: {
    type: String,
  }
});

const roadmapSchema = new mongoose.Schema({
  roadmapName: String,
  roadmap: [nameLessonsSchema]
})


const Roadmap = mongoose.model('Roadmap', roadmapSchema);

export default Roadmap;
