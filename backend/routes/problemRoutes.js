const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');

router.get('/', problemController.getAllProblems);
router.get('/union/:unionId', problemController.getProblemsByUnion);
router.get('/stats/:unionId', problemController.getProblemStats);
router.post('/', problemController.createProblem);
router.put('/:id/status', problemController.updateProblemStatus);
router.put('/:id/upvote', problemController.upvoteProblem);

module.exports = router;
