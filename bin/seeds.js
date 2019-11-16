const mongoose = require('mongoose');
const Story = require('../models/Story');
const Theme = require('../models/Theme');


mongoose.connect('mongodb://localhost/project-mute', { useNewUrlParser: true, useUnifiedTopology: true });
Story.collection.drop();
Theme.collection.drop();

const seeds = async () => {
  const themes = 
    {
      checkpoint: ["planeta-01.png", "planeta-05.png", "planeta-04.png", "planeta-03.png", "planeta-02.png", "wireframes-09.png"],
      background: "wireframes-10.png",
      price: String
    }
  

  const newThemes = await Theme.create(themes)
  console.log(newThemes)


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
      theme: newThemes._id,
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
      theme: newThemes._id,
      default: true,
    }
  ]




  Story.create(stories, (err) => {
    if (err) { throw (err) }
    console.log(`Created ${stories.length} stories`)
  })
}

seeds()
