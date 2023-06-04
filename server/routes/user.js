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
    getAllOrders,
    confirmPayment,
    getUserOrder,
    getUserDetails,
    paginatedData,
    paginatedOrderUser,
    getAlldish,
    bookedOrders,
    verify} =require('../controller/user')

router.post('/register',register)
router.post('/login',login)
router.post('/googleregister',googleRegister)
router.post('/login-google',googleLogin)
router.post('/otp-number',recievingNumber);
router.post('/otp-verify',verify)
router.post('/checkout',checkoutData)
router.post('/confirm-payment',confirmPayment)

router.get('/get-all-restaurants',getAllRestaurants)
router.get('/get-specific-dish/:id',getSpecificDish)
router.get('/table-data:id',tableData)
router.get('/get-orders:id',getAllOrders)
router.get('/user-order:id',getUserOrder)
router.get('/get-user:id',getUserDetails)
router.get('/get-paginated-data',paginatedData)
router.get('/user-paginated-order',paginatedOrderUser)
router.get('/get-all-dish',getAlldish)
router.get('/get-booked-orders',bookedOrders)

module.exports=router