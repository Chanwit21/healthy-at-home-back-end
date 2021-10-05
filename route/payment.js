const router = require('express').Router();
const passport = require('passport');
const paymentController = require('../controller/payment');

router.post('/card', passport.authenticate('jwtCustomer', { session: false }), paymentController.payMentByCard);
router.post('/source', passport.authenticate('jwtCustomer', { session: false }), paymentController.payMentBySource);
router.post('/web_hook', paymentController.webHook);

module.exports = router;
