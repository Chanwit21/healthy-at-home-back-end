const router = require('express').Router();
const passport = require('passport');
const contactUsController = require('../controller/contactUs');

router.get('/', passport.authenticate('jwtAdmin', { session: false }), contactUsController.getAllContactUs);
router.post('/', contactUsController.createContactUs);
router.delete('/:id', passport.authenticate('jwtAdmin', { session: false }), contactUsController.deleteContactUs);

module.exports = router;
