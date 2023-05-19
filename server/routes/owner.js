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
    getAllTableDetails
     }=require('../controller/owner')
//post
router.post('/sign-up',signUp)
router.post('/owner-login',login)
router.post('/res-details',resDetails)
router.post('/dish-details',dishDetails)
router.post('/edit-dish',editDish)
router.post('/edit-res',editRes)
router.post('/owner-proper-details',properDetails)
router.post('/owner-table-details',addTable)

//get
router.get('/get-res-details:id',getRestaurants)
router.get('/get-dish-details:id',getDishDetails)
router.get('/delete-dish/:dishId/:ownerId',deleteDish)
router.get('/get-one-dish:id',OneDish)
router.get('/delete-restaurant/:resId/:ownerId',deleteRestaurant)
router.get('/get-one-res:id',oneResDetails)
router.get('/get-table-details:id',getAllTableDetails)

module.exports=router