const router = require('express').Router();
const exerciseController = require('../controller/exercisePosture');

router.get('/', exerciseController.getAllExercisePosture);
router.get('/:id', exerciseController.getExercisePostureById);
router.post('/', exerciseController.createExercisePosture);
router.put('/:id', exerciseController.updateExercisePosture);
router.delete('/:id', exerciseController.deleteExercisePosture);

module.exports = router;
