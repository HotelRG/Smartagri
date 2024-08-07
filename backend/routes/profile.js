const express = require('express')

//controller functions
const {getuser,updateuser} = require('../controllers/profilecontroller');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)
//get user
router.get('/:id', getuser);

//get all user

//update user job
router.patch('/:id', updateuser);



module.exports = router
