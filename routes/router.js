const express = require('express')
const users = require('../models/userSchema')
const userController = require('../controllers/userController')
const upload = require('../multerConfig/storageConfig')


const router = new express.Router()

//REGISTER
router.post('/employee/register',upload.single('user_profile'),userController.userRegister)

//GET ALL USER
router.get('/get-all-employees',userController.getalluser)

//Get user details
router.get('/employee/view/:id',userController.getuserdetail)


//edit user
router.put('/employee/edit/:id',upload.single('user_profile'),userController.editUser)

//delete user
router.delete('/employee/delete/:id',userController.deleteUser)



module.exports = router


