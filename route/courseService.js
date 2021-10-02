const router = require('express').Router();
const passport = require('passport');
const courseServiceController = require('../controller/courseService');
const multer = require('multer');
const { upload } = require('../config/multer');

router.get('/', courseServiceController.getAllCourseService);
router.post(
  '/',
  passport.authenticate('jwtAdmin', { session: false }),
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
  ]),
  courseServiceController.createCourseService
);

router.put(
  '/text/:id',
  passport.authenticate('jwtAdmin', { session: false }),
  courseServiceController.updateTextCourseService
);

router.put(
  '/image1/:id',
  passport.authenticate('jwtAdmin', { session: false }),
  upload.single('image1'),
  courseServiceController.updateImageCourseService
);

router.put(
  '/image2/:id',
  passport.authenticate('jwtAdmin', { session: false }),
  upload.single('image2'),
  courseServiceController.updateImageCourseService
);

router.delete(
  '/:id',
  passport.authenticate('jwtAdmin', { session: false }),
  courseServiceController.deleteCourseService
);

module.exports = router;
