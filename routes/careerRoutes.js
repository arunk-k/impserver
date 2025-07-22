const express = require('express')

const careerController = require('../controllers/careerController')

const router = express.Router()

const authenticateJWT =require('../middlewares/jwtMiddleware')

// Admin routes
router.post('/',authenticateJWT , careerController.addCareer);
router.put('/:id', careerController.updateCareer);
router.delete('/:id', careerController.deleteCareer);

// User routes
router.get('/',authenticateJWT , careerController.getAllCareers); // For Explore page
router.post('/suggest', careerController.getSuggestedCareers); // For Suggest Careers
router.get('/:id', careerController.getCareerById); // For career details page

module.exports = router;
