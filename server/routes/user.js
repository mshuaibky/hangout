const express=require('express')
const router=express.Router()
const {register,login,googleRegister} =require('../controller/user')

router.post('/register',register)
router.post('/login',login)
router.post('/googleregister',googleRegister)


module.exports=router