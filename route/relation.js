const passport = require('passport');
const router = require('express').Router();
const relationController = require('../controller/relation');

router.get('/search', passport.authenticate('jwtAdmin', { session: false }), relationController.getRelationByQuery);
router.put('/:id', passport.authenticate('jwtAdmin', { session: false }), relationController.updateRelation);

module.exports = router;
