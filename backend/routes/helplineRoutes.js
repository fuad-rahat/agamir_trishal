const express = require('express');
const router = express.Router();
const helplineController = require('../controllers/helplineController');

router.get('/', helplineController.getAllHelplines);
router.get('/category/:category', helplineController.getHelplinesByCategory);
router.post('/', helplineController.createHelpline);
router.put('/:id', helplineController.updateHelpline);
router.delete('/:id', helplineController.deleteHelpline);

module.exports = router;
