const mongoose = require('mongoose');
const Story = require('../models/Story');
const Theme = require('../models/Theme');


mongoose.connect('mongodb://localhost/project-mute', { useNewUrlParser: true, useUnifiedTopology: true });
Story.collection.drop();
Theme.collection.drop();

const seeds = async () => {
  const themes =[
  {
    checkpoint: ["planeta-01.png", "planeta-05.png", "planeta-04.png", "planeta-03.png", "planeta-02.png"],
    background: "wireframes-10.png",
    price: String
    }, {
      checkpoint: ["animal-1.png", "animal-2.png", "animal-3.png", "animal-4.png", "animal-5.png"],
      background: "sea-background.png",
      price: String
    }
  ]


  const newThemes = await Theme.create(themes)
 


  const stories = [
    {
      title: "El Dragón y las estrellas",
      paragraph: [{
        text: "Noemí era una niña traviesa y valiente, un día decidió ir al bosque para ver con sus ojos todas las maravillas que contaban los cuentos. En el bosque encontró un dragón que lloraba. Era verde, con una cresta dorada que brillaba como las estrellas. - ¿Por qué lloras Dragón? - Me llamo Geri, y lloro porque no encuentro mi casa. - No te preocupes – dijo Noemí – yo te ayudaré.",
        question: "¿De que color era el Dragón?",
        answer1: "Amarillo",
        answer2: "Plateado",
        answer3: "Verde",
        correct: "answer3"
      },
      {
        text: "Entonces los dos amigo empezaron el viaje. Primero fueron a visitar al Pato Milcolores, que estaba distraido mirando como sus colores se reflejaban en el agua -  ¿Pato MilColores, sabes dónde está la casa de Geri, el Dragón? - CuaCua! Yo no se dónde está la casa del Dragón.¿Por qué no se lo preguntáis al Caracol BabaPompa ?",
        question: "¿Como se llama el Pato?",
        answer1: "MilPlumas",
        answer2: "MilColores",
        answer3: "MisAlas",
        correct: "answer2"
      }, {
        text: "El Caracol estaba haciendo burbujas con sus babas. - Caracool BabaPompa ¿Sabes dónde está la casa de Geri el Dragón? - BluBlu! No se dónde está la casa del Dragón.¿Porqué no se lo preguntáis a mi amigo el León Dormilón ?",
        question: "¿Quién es el amigo del Caracol?",
        answer1: "El Mono Burlón",
        answer2: "El Loro Cantor",
        answer3: "El León Dormilón",
        correct: "answer3"
      }, {
        text: "El León Dormilón estaba como siempre durmiendo y roncando. - ¡León Dormilón! ¿Sabes dónde está la casa de Geri el Dragón? - Grrr! Yo no se dónde está la ca… Antes de terminar la frase el León Dormilón se volvió a dormir.Y los dos amigos, cansados de tanto caminar se durmieron también. ",
        question: "¿Que hacía el León?",
        answer1: "Roncaba",
        answer2: "Comía",
        answer3: "Bailaba",
        correct: "answer1"
      }, {
        text: "Mientras dormía, Noemí sonó que volaba con Geri en un universo de estrellas. Y ahí en medio había un planeta habitado por hadas, magos, princesas,  piratas...y dragones. De repente Noemí abrió los ojos y estaba en su cama, y en la mesita de noche había un libro abierto, un libro sobre Dragones.",
        question: "¿Qué sueña Noemí?",
        answer1: "El mar",
        answer2: "Las estrellas",
        answer3: "El bosque",
        correct: "answer1"
      }],

      theme: newThemes[0]._id,
      storyDefault: true,
    },
    {
      title: "second story",
      paragraph: [{
        text: "primer paragrafo",
        question: "primera pregunta?",
        answer1: "Respuesta1",
        answer2: "Respuesta2",
        answer3: "Respuesta3",
        correct: "answer2"
      },
      {
        text: "segundo paragrafo",
        question: "segunda pregunta?",
        answer1: "Respuesta1",
        answer2: "Respuesta2",
        answer3: "Respuesta3",
        correct: "answer2"
      }, {
        text: "tercer paragrafo",
        question: "tercera pregunta?",
        answer1: "Respuesta1",
        answer2: "Respuesta2",
        answer3: "Respuesta3",
        correct: "answer2"
      }, {
        text: "cuarto paragrafo",
        question: "cuarta pregunta?",
        answer1: "Respuesta1",
        answer2: "Respuesta2",
        answer3: "Respuesta3",
        correct: "answer2"
      }, {
        text: "qquinto paragrafo",
        question: "quinta pregunta?",
        answer1: "Respuesta1",
        answer2: "Respuesta2",
        answer3: "Respuesta3",
        correct: "answer2"
      }],

      theme: newThemes[1]._id,
      storyDefault: true,
    }
  ]


  Story.create(stories, (err) => {
    if (err) { throw (err) }
    console.log(`Created ${stories.length} stories`)
  })
}

seeds()
