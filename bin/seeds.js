const mongoose = require('mongoose');
const Story = require('../models/Story');


mongoose.connect('mongodb://localhost/project-mute', { useNewUrlParser: true, useUnifiedTopology: true });
Story.collection.drop();

const stories = [
  {
    title: "First story",
    paragraph: ["primer parrafp", "segundo parrafo", "tercer parrafo", "cuarto parrafo", "quinto parrafo"],
    questions: [{
      question: "primera pregunta?",
      answer1: "Respuesta1",
      answer2: "Respuesta2",
      answer3: "Respuesta3",
      correct: "answer2"
    }],
    default: true,
  },
  {
    title: "Second story",
    paragraph: ["primer parrafp", "segundo parrafo", "tercer parrafo", "cuarto parrafo", "quinto parrafo"],
    questions: [{
      question: "primera pregunta?",
      answer1: "Respuesta1",
      answer2: "Respuesta2",
      answer3: "Respuesta3",
      correct: "answer1"
    }],
    default: true,
  }
]

Story.create(stories, (err) => {
  if (err) { throw (err) }
  console.log(`Created ${stories.length} stories`)
})