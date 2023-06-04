const express =require('express')
const router=express.Router()
const {AdminSignUp,AdminLogin,allUsers,
    allOwners,
    blockOwner,
    acceptUser,
    getAllRes
    
}=require('../controller/admin')

const {varifyToken}=require('../middlewares/admin')


router.post('/sign-up',AdminSignUp)
router.post('/login',AdminLogin)
router.get('/get-user-details',allUsers)
router.get('/get-owner-data',allOwners)
router.get('/handle-owner:id',blockOwner)
router.get('/accept-user:id',acceptUser)
router.get('/varify',varifyToken)
router.get('/restaurants',getAllRes)

module.exports= router