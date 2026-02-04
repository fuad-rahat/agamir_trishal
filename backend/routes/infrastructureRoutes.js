const express = require('express');
const router = express.Router();
const infrastructureController = require('../controllers/infrastructureController');

router.get('/', infrastructureController.getAllInfrastructure);
router.get('/union/:unionId', infrastructureController.getInfrastructureByUnion);
router.get('/summary/:unionId', infrastructureController.getInfrastructureSummary);
router.post('/', infrastructureController.createInfrastructure);
router.put('/:id', infrastructureController.updateInfrastructure);
router.delete('/:id', infrastructureController.deleteInfrastructure);

module.exports = router;
