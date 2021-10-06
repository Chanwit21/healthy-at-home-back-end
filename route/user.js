const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const userController = require('../controller/userController');
const passport = require('passport');
const multer = require('multer');
const { upload } = require('../config/multer');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/changerole', passport.authenticate('jwtAdmin', { session: false }), userController.changeUserRole);
router.put(
  '/update_profile',
  passport.authenticate('jwtAlluser', { session: false }),
  upload.single('profile-image'),
  userController.updateUser
);
router.get('/user_info', passport.authenticate('jwtAlluser', { session: false }), userController.getUserInfo);

module.exports = router;
