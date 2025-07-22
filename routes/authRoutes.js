const express=require('express')

const authController=require('../controllers/authController')

const router=express.Router()

//admin
router.post('/admin/login', authController.loginAdmin);

//user
router.post('/register',authController.registerUser)
router.post('/login',authController.loginUser)

module.exports=router