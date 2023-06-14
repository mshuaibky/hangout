const express =require('express')
const router=express.Router()
const {AdminSignUp,AdminLogin,allUsers,
    allOwners,
    blockOwner,
    acceptUser,
    getAllRes,
    getAdminYearlyData,
    getMonthlyData,
    getAdminData,
    logotAdmin
    
}=require('../controller/admin')

const {varifyToken}=require('../middlewares/auth')


router.post('/sign-up',AdminSignUp)
router.post('/login',AdminLogin)
router.get('/get-user-details',varifyToken,allUsers)
router.get('/get-owner-data',varifyToken,allOwners)
router.get('/handle-owner:id',blockOwner)
router.get('/accept-user:id',acceptUser)

router.get('/restaurants',getAllRes)
router.get('/admin-yearly-data',getAdminYearlyData)
router.get('/admin-monthly-data',getMonthlyData)
router.get('/admin-daily-data',getAdminData)
router.get('/logout-admin:id',logotAdmin)
module.exports= router