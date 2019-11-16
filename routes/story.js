const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../helpers/middlewares');

const Map = require("../models/Map");
const Story = require('../models/Story');

//get all stories. Només ho utilitzarem quan fem buscador de totes les histories del mon
router.get('/', isLoggedIn(), async (req, res, next) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories)
  } catch (error) {
    next(error);
  }
});

router.get('/themes', isLoggedIn(), async (req, res, next) => {
  try {
    const themes = await themes.find();
    res.status(200).json(themes)
  } catch (errors) {
    next(error);
  }
})


// Create new Story
router.post('/addStory', isLoggedIn(), async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    console.log(userId);
    const newStory = req.body;
    newStory.creator = userId;
    const createdStory = await Story.create(newStory);
    res.status(200).json(createdStory);
  } catch (error) {
    next(error);
  }
});

//edit story
router.put('/:idStory/edit', isLoggedIn(), async (req, res, next) => {
  const { idStory } = req.params;
  const storyUpdated = req.body;
  try {
    const updated = await Story.findByIdAndUpdate(
      idStory,
      storyUpdated,
      { new: true }
    );
  
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});


//delete route

// router.delete('/:idStory/delete', isLoggedIn(), async (req, res, next) => {
//   const { idStory } = req.params;
//   try {
//     await Story.findByIdAndDelete(idStory);
//     res.status(200).json({ message: 'story deleted' });
//   } catch (error) {
//     next(error);
//   }
// });


module.exports = router;