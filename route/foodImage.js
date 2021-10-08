const passport = require('passport');
const { upload } = require('../config/multer');
const router = require('express').Router();
const foodImageController = require('../controller/foodImage');

router.get('/', passport.authenticate('jwtAlluser', { session: false }), foodImageController.getFoodImageByQuery);
router.post(
  '/',
  passport.authenticate('jwtAdmin', { session: false }),
  upload.single('food_image'),
  foodImageController.createImage
);
router.delete('/:id', passport.authenticate('jwtAdmin', { session: false }), foodImageController.deleteImage);

module.exports = router;
