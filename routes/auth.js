const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");

// HELPER FUNCTIONS
// destructuro las helper functions
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin
} = require("../helpers/middlewares");
//  GET    '/me'
//  - check if the user IS logged in using helper function (check if session exists)
// chquear si el usuario está logueado (si existe la sesión)
router.get('/me', isLoggedIn(), (req, res, next) => {
  //  - if yes, send the response with user info (available on req.session.currentUser)
  // si está logueado, oculta el password y devuelve un json con los datos de user
  req.session.currentUser.password = '*';
  res.json(req.session.currentUser);
});
//  POST    '/login'
//  - check that user is NOT logged in - using helper function (check if req.session.currentUser exists)
//  - check that `password` and `username` are sent - using helper function
// validar que el usuario no esté ya logueado
// revisa que el username y el password se estén enviando
router.post('/login', isNotLoggedIn(), validationLoggin(), async (req, res, next) => {
  const { username, password } = req.body;
  try {
    //  - check if user exists in the DB
    // revisa si el usuario existe en la BD
    const user = await User.findOne({ username }) ;
    //  - if user doesn't exist - forward the error to the error middleware using `next()`
    // si no lo encuentra en la BD, devuelve un error
    if (!user) {
      next(createError(404));
    } 
    //  - if user exists get assign the user document to `req.session.currentUser` and then send  json response
    // si el usuario existe, hace hash del password y lo compara con el de la BD
    // loguea al usuario asignando el document a req.session.currentUser, y devuelve un json con el user
    else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res
        .status(200)
        .json(user);
      return 
    } 
    else {
      next(createError(401));
    }
  } 
  catch (error) {
    next(error);
  }
},
);
//  POST    '/signup'
router.post(
  "/signup",
  //  - check that user is NOT logged in - using helper function (check if req.session.currentUser exists)
  // revisamos si el user no está ya logueado
  isNotLoggedIn(),
  //  - check that `password` and the `username` are sent - using helper function
  // revisa que esté completos los valores de username y password
  validationLoggin(),
  async (req, res, next) => {
    const { username, password } = req.body;
    try {
      // projection
      // - check if `username` already exists in the DB
      // se fija si ya existe ese username en la BD
      const usernameExists = await User.findOne({ username }, "username");
//  - if username exists - forward the error to the error middleware using `next()`
// si el usuario ya existe en la Bd, devuelve un error
      if (usernameExists) return next(createError(400));
      else {
        //  - else if username doesn't exists hash the password and create new user in the DB
        // si el username no existe en la BD, hace hash del password y crea un nuevo usuario en la BD
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ username, password: hashPass });
        //  - then assign the  new user document to `req.session.currentUser` and then send  json response
        // automáticamente, levantamos la sesión del user, con los datos que ingresamos en la BD
        req.session.currentUser = newUser;
        res
          .status(200) //  OK
          .json(newUser);
      }
    } catch (error) {
      next(error);
    }
  }
);
//  POST    '/logout'
//  - check if the user IS logged in using helper function (check if session exists)
// revisar si el usuario está logueado, y luego destruimos la sesión
router.post('/logout', isLoggedIn(), (req, res, next) => {
  //  - destroy the session
  req.session.destroy();
  //  - set status code and send the response back
  res
    .status(204)  //  No Content
    .send();
  return; 
});
//  GET    '/private'   --> Only for testing - Same as /me but it returns a message instead
//  - check if the user IS logged in using helper function (check if session exists)
// revisa si el usuario está logueado, y devuelve un mensaje
router.get('/private', isLoggedIn(), (req, res, next) => {
  //  - set status code and send the json message response back
  res
    .status(200)  // OK
    .json({ message: 'Test - User is logged in'});
});
module.exports = router;