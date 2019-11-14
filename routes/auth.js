const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");
const Map = require("../models/Map");
const Story = require("../models/Story");

// HELPER FUNCTIONS
// destructuro las helper functions
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin
} = require("../helpers/middlewares");

router.get('/me', isLoggedIn(), (req, res, next) => {
 
  req.session.currentUser.password = '*';
  res.json(req.session.currentUser);
});
//  POST    '/login'
router.post('/login', isNotLoggedIn(), validationLoggin(), async (req, res, next) => {
  const { username, password, mail } = req.body;
  try {
    const user = await User.findOne({ mail });
    if (!user) {
      next(createError(404));
    }
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
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { username, password, mail } = req.body;
    try {
      const mailExists = await User.findOne({ mail }, "mail");

      if (mailExists) return next(createError(400));
      else {

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        const stories = await Story.find({ default: true });
        const maps = []

        //un mapa por cada story y push del newmap.id a un array
        // stories.map(async (story) => {
        //   const newMap = await Map.create({ story: story._id })
        //   maps.push(newMap._id)
        //   console.log(maps)
        // })

        for (let i = 0; i < stories.length; i++) {
          const newMap = await Map.create({ story: stories[i]._id })
          maps.push(newMap._id)
        }

        //crear user con el array de maps
        const newUser = await User.create({ username, password: hashPass,mail, travelMap: maps });
        console.log("maps fuera: ", maps)
        console.log(newUser)

        // recorrer array de maps para buscar cada uno y añadirle id de newUserç
        for(let i=0; i<maps.length; i++){
          const findMap = await Map.findByIdAndUpdate(maps[i], { userId: newUser._id })
        }

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
router.post('/logout', isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  res
    .status(204)  //  No Content
    .send();
  return;
});
router.get('/private', isLoggedIn(), (req, res, next) => {
  res
    .status(200)  // OK
    .json({ message: 'Test - User is logged in' });
});
module.exports = router;