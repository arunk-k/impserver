const express = require('express');
const router = express.Router();

const roadmapController = require('../controllers/roadmapController');
const authenticateJWT = require('../middlewares/jwtMiddleware');

// Admin-only routes (Add/Edit/Delete roadmap steps)
router.post('/', authenticateJWT, roadmapController.addStep);
router.put('/:id', authenticateJWT, roadmapController.updateStep);
router.delete('/:id', authenticateJWT, roadmapController.deleteStep);

// Get all roadmap steps for a career
router.get('/career/:careerId', roadmapController.getStepsByCareerId);

module.exports = router;
