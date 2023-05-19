const express=require('express')
const router=express.Router()
const {register,
    login,
    googleRegister,
    googleLogin,
    recievingNumber,
    getAllRestaurants,
    getSpecificDish,
    tableData,
    checkoutData,
    verify} =require('../controller/user')

router.post('/register',register)
router.post('/login',login)
router.post('/googleregister',googleRegister)
router.post('/login-google',googleLogin)
router.post('/otp-number',recievingNumber);
router.post('/otp-verify',verify)
router.post('/checkout',checkoutData)

router.get('/get-all-restaurants',getAllRestaurants)
router.get('/get-specific-dish/:id',getSpecificDish)
router.get('/table-data:id',tableData)
module.exports=router