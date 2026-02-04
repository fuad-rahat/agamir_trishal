const express = require('express');
const router = express.Router();
const pollingStationController = require('../controllers/pollingStationController');

router.get('/', pollingStationController.getAllPollingStations);
router.get('/union/:unionId', pollingStationController.getStationsByUnion);
router.post('/', pollingStationController.createPollingStation);
router.put('/:id', pollingStationController.updatePollingStation);
router.put('/:id/verify', pollingStationController.verifyPollingStation);
router.delete('/:id', pollingStationController.deletePollingStation);

module.exports = router;
