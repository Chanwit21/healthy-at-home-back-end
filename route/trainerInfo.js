const router = require('express').Router();
const trainerInfoController = require('../controller/trainerInfo');

router.get('/', trainerInfoController.getAllTrainerInfo);

module.exports = router;
