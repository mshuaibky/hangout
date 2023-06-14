const express=require('express')
const router=express.Router()
const {signUp,
    login,
    resDetails,
    getRestaurants,
    dishDetails,
    getDishDetails,
    deleteDish,
    OneDish,
    editDish,
    deleteRestaurant,
    oneResDetails,
    editRes,
    properDetails,
    addTable,
    getAllTableDetails,
    getOrderOwner,
    paginatedOrder,
    bannerDetails,
    getBanner,
    deleteBanner,
    getOneOrders,
    deleteTable,
    yearlyData,
    monthlyData,
    dailyData,
    salesOrder,
    logoutOwner
     }=require('../controller/owner')

const {varifyToken}=require('../middlewares/owner-auth')

//post
router.post('/sign-up',signUp)
router.post('/owner-login',login)
router.post('/res-details',resDetails)
router.post('/dish-details',dishDetails)
router.post('/edit-dish',editDish)
router.post('/edit-res',editRes)
router.post('/owner-proper-details',properDetails)
router.post('/owner-table-details',addTable)
router.post('/banner-details',bannerDetails)

//get
router.get('/get-res-details:id',getRestaurants)
router.get('/get-dish-details:id',getDishDetails)
router.get('/delete-dish/:dishId/:ownerId',deleteDish)
router.get('/get-one-dish:id',OneDish)
router.get('/delete-restaurant/:resId/:ownerId',deleteRestaurant)
router.get('/get-one-res:id',oneResDetails)
router.get('/get-table-details:id',getAllTableDetails)
router.get('/get-order-owner:id',getOrderOwner)
router.get('/get-paginated-order',paginatedOrder)
router.get('/get-banner:id',getBanner)
router.get('/delete-banner/:bannerId/:ownerId',deleteBanner)
router.get('/get-one-order:id',getOneOrders)
router.get('/delete-table:id',deleteTable)
router.get('/get-yearly:id',yearlyData)
router.get('/get-monthly:id',monthlyData)
router.get('/get-daily:id',dailyData)
router.get('/get-order-sales/:ownerId/:userId',salesOrder)
router.get('/logout:id',logoutOwner)

module.exports=router