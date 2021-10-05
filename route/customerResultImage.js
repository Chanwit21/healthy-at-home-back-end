const router = require('express').Router();
const passport = require('passport');
const { upload } = require('../config/multer');
const customerResultImageController = require('../controller/customerResultImage');

router.get('/', customerResultImageController.getAllImage);
router.post(
  '/',
  passport.authenticate('jwtAdmin', { session: false }),
  upload.single('customer_result_image'),
  customerResultImageController.createImage
);
router.delete('/:id', passport.authenticate('jwtAdmin', { session: false }), customerResultImageController.deleteImage);

module.exports = router;
