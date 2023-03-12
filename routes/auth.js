const express = require('express')
const router = express.Router()
const {adminRegister, adminLogin, userRegister, userLogin} = require("../controllers/auth")
 


router.post('/admin/register', adminRegister)
router.post('/admin/login', adminLogin)
router.post('/user/register', userRegister)
router.post('/user/login', userLogin)



module.exports = router