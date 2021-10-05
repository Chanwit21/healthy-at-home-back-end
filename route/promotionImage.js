const router = require('express').Router();
const passport = require('passport');
const { upload } = require('../config/multer');
const promotionImageController = require('../controller/promotionImage');

router.get('/', promotionImageController.getAllImage);
router.post(
  '/',
  passport.authenticate('jwtAdmin', { session: false }),
  upload.single('promotion_image'),
  promotionImageController.createImage
);
router.delete('/:id', passport.authenticate('jwtAdmin', { session: false }), promotionImageController.deleteImage);

module.exports = router;
