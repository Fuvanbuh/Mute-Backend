const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../helpers/middlewares');


const Map = require("../models/Map");
const Story = require('../models/Story');
const Theme = require('../models/Theme')

// get all maps
router.get('/', isLoggedIn(), async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const listMaps = await Map.find({ userId: userId }).populate({
      path: 'story',      
      populate: { path: 'theme' }
    });
    console.log(listMaps)
    res.status(200).json(listMaps);
  } catch (error) {
    next(error);
  }
});



//get one map
router.get('/:idMap', isLoggedIn(), async (req, res, next) => {
  try {
    const { idMap } = req.params;
    const oneMap = await Map.findById(idMap).populate({
      path: 'story',
      populate: { path: 'theme' }
    });
    res.status(200).json( oneMap );
  } catch (error) {
    next(error);
  }
});





//edit map
router.put('/:idMap/edit', isLoggedIn(), async (req, res, next) => {
  const { idMap } = req.params;

  try {
    const answered = await Map.findByIdAndUpdate(
      idMap,
      { $inc: { completePath: 1 } },
      { new: true }
    );

    res.status(200).json(answered);
  } catch (error) {
    next(error);
  }
});


//delete one map

router.delete('/:idMap/delete', isLoggedIn(), async (req, res, next) => {
  const { idMap } = req.params;
  if (!idMap){
    res.status(404).json({message: 'id not found'})
  }
  try {
    await Map.findByIdAndDelete(idMap);
    res.status(200).json({ message: 'map deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

