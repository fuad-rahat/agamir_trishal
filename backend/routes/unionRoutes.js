const express = require('express');
const router = express.Router();
const unionController = require('../controllers/unionController');
const { authMiddleware, checkPermission } = require('../middleware/authMiddleware');

router.get('/', unionController.getAllUnions);
router.get('/:id', unionController.getUnionById);
router.post('/', unionController.createUnion);
router.put('/:id', unionController.updateUnion);

// Admin protected routes for union info management
router.put('/:id/info', authMiddleware, checkPermission('add_union_info'), unionController.updateUnionInfo);
router.post('/:id/chairman', authMiddleware, checkPermission('add_union_info'), unionController.addChairman);
router.post('/:id/place-to-visit', authMiddleware, checkPermission('add_union_info'), unionController.addPlaceToVisit);
router.put('/:id/place-to-visit/:placeId', authMiddleware, checkPermission('add_union_info'), unionController.updatePlaceToVisit);
router.delete('/:id/place-to-visit/:placeId', authMiddleware, checkPermission('add_union_info'), unionController.deletePlaceToVisit);
router.post('/:id/famous-place', authMiddleware, checkPermission('add_union_info'), unionController.addFamousPlace);
router.post('/:id/culture', authMiddleware, checkPermission('add_union_info'), unionController.addCultureItem);
router.put('/:id/culture/:cultureId', authMiddleware, checkPermission('add_union_info'), unionController.updateCultureItem);
router.delete('/:id/culture/:cultureId', authMiddleware, checkPermission('add_union_info'), unionController.deleteCultureItem);
router.post('/:id/food', authMiddleware, checkPermission('add_union_info'), unionController.addFamousFood);
router.put('/:id/food/:foodId', authMiddleware, checkPermission('add_union_info'), unionController.updateFoodItem);
router.delete('/:id/food/:foodId', authMiddleware, checkPermission('add_union_info'), unionController.deleteFoodItem);
router.put('/:id/introduction', authMiddleware, checkPermission('add_union_info'), unionController.updateIntroduction);

module.exports = router;
