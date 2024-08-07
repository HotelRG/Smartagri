const express = require('express')

//controller functions
const {signupUser,loginUser,getuser,getalluser,updateuser,forgetpassword} = require('../controllers/registercontroller');


const router = express.Router()
router.post("/forgetpassword",forgetpassword)

//Login Router
router.post('/login',loginUser)

//get user
router.get('/:id', getuser);

//get all user
router.get('/', getalluser);

//update user job
router.patch('/:id', updateuser);

//Signup Router
router.post('/signup',signupUser)



module.exports = router
