const Admin=require('../model/admin/admin')
const User=require('../model/user/user')
const Owner=require('../model/owner/owner')
const Details=require('../model/owner/details-restaurant')
const Order=require('../model/user/order')
const Restuarant=require('../model/owner/restaurants')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const maxAge = 1 * 24 * 60 * 60


//admin SignUP
exports.AdminSignUp=(req,res)=>{
    console.log(req.body);
    try {
        const {email,password}=req.body
    return new Promise((resolve,reject)=>{
        if(password){
    bcrypt.hash(password,10,function(err,hash){
        if(err){
            res.status(500).send({msg:'err'})
        }
        const admin=new Admin({
            email,
            password:hash
        })
        admin.save().then((admin)=>{
            // resolve(admin)
            res.status(201).send({msg:'admin added'})
        }).catch((error)=>{
            reject(error)
        })
        
    })
        }
    })

    } catch (error) {
        
    }
}

//adminLogin
exports.AdminLogin=async(req,res)=>{
    try {
        const {email,password}=req.body
        const admin= await Admin.find({email})
        console.log(admin,'namma admin');
        if(admin){
            

            const validateAdmin=await bcrypt.compare(password,admin[0].password)
            if(validateAdmin){
                const update= await Admin.updateOne({email:email},
                    {
                        $set:{
                            isAdmin:true
                        }
                    })
                   
               const token=jwt.sign({id:admin[0]._id},process.env.JWT_KEY,{
                expiresIn:"24hr" 
               })
             res.cookie('jwt',token,{
                withCredentials: true,
                httpOnly: false,
                maxAge: maxAge
             })
                   
                res.status(200).send({msg:'admin details matched',admin:admin,token})
            }else{
                res.status(500).send({msg:'password does not match'})
            }
        }else{
            res.status(500).send({msg:'admin not found'})
        }
    } catch (error) {
        res.status(500).send({msg:'credentials does not match'})
    }
}
//varifyAdmin
// exports.varifyToken=(req,res,next)=>{
//     try {
        
//         const headers=req.headers['authorization']
//         console.log(headers,'headers');
//           next()
//     } catch (error) {
//         console.log(error.message);
//     }
// }
exports.allUsers=async(req,res)=>{
    try {
       let user= await User.find({}) 
       if(user){
        res.status(200).send({data:user})
       }

    } catch (error) {
        res.send(error.message)
    }
}

exports.allOwners=async(req,res)=>{
    try {
        let owner=await Owner.find({})
        if(owner){
            res.status(200).send({data:owner})
        }else{
            res.status(401).send({msg:'no data'})
        }

    } catch (error) {
        res.send(error)
    }
}
exports.blockOwner=async(req,res)=>{
  try {
    const {id}=req.params
    const data=await Owner.findByIdAndUpdate(id,{isOwner:false})
    console.log(data);
    if(data){
        const owner=await Owner.find({})
        res.status(200).send({data:owner})
    }else{
        res.status(500).send({msg:'data not changed'})
    }
  } catch (error) {
    res.send(error)
  }
}

exports.acceptUser=async(req,res)=>{
    try {
        
        const {id}=req.params
      let data=await Owner.findByIdAndUpdate(id,{isOwner:true})
     if(data){
        const owners = await Owner.find({})
        res.status(200).send({data:owners})
     }else{
        res.status(500).send({msg:'data not changed'})
     }
    } catch (error) {
        res.send(error)
    }
 }
 //getting all restaurants
 exports.getAllRes=async(req,res)=>{
    try {
        let restaurant=await Restuarant.find({})
        console.log(restaurant,'res database');
        if(restaurant){
            res.status(200).send({data:restaurant})
        }else{
            res.status(500).send({msg:'something went wrong'})
        }
    } catch (error) {
        res.send(error)
    }
 }
 //getting yearly data
 exports.getAdminYearlyData=async(req,res)=>{
    try {
        const result=await Order.aggregate([
            {
                $group:{
                    _id:{ $year : "$createdAt" },
                    totalSales: { $sum: { $toDouble: "$total" } }
                }
               
            },
            {
                $sort:{_id:1}
            }
        ])
     if(result){
        const yearlyReport =result.map(yearData=>yearData.totalSales)
        res.status(200).send({data:yearlyReport})
     }else{
        res.status(500).send({msg:'cannot get data'})
     }
    } catch (error) {
      res.status(500).send(error)
    }
 }
 //getting monthly data
 exports.getMonthlyData=async(req,res)=>{
    try {
        const result= await Order.aggregate([
           
            {
                $group:{
                    _id:{
                        $month:"$date"
                    },
                    totalAmount:{
                         $sum: { $toDouble: "$total" } 
                    }
                }
            },
            {
                $project:{
                    _id:0,
                    month:"$_id",
                    totalAmount:1
                }
            },
            {
                $group:{
                    _id:null,
                    data:{
                        $push:{
                            month:"$month",
                            totalAmount:"$totalAmount"
                        }
                    }
                }
            },
            {
                $unwind: {
                    path: "$data",
                    includeArrayIndex: "index",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: "$data.month",
                    totalAmount: {
                        $max: "$data.totalAmount"
                    }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    totalAmount: {
                        $ifNull: ["$totalAmount", 0]
                    }
                }
            }
        ])
        const months = Array.from(Array(12), (_, i) => i + 1); // Generate an array of months (1 to 12)
        const prices = months.map(month => {
            const resultItem = result.find(item => item.month === month);
            return resultItem ? resultItem.totalAmount : 0;
        });
      
        res.status(200).send({data:prices})
    } catch (error) {
        
    }
 }
 //getting daily data
 exports.getAdminData=async(req,res)=>{
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const result=await Order.aggregate([
            {
                $match: {
                    date: { $gte: today },
                  
                }
            },
            {
                $group: {
                    _id: null,
                    total:  {
                        $sum: { $toDouble: "$total" } 
                   }
                },
            },
        ])
        const dailyTotal = result.length > 0 ? result[0].total : 0;
        res.status(201).send({data:dailyTotal})
    } catch (error) {
        res.status(500).send({msg:'cannot get data'})
    }
 }
 //logout admin
 exports.logotAdmin=async(req,res)=>{
    try {
       const {id}=req.params
       const logout=await Admin.findByIdAndUpdate(id,{
        $set:{
            isAdmin:false
        }
    })
   if(logout){
    res.status(200).send({data:logout})
   }else{
    res.status(500).send({msg:'cannot logout'})
   }
    } catch (error) {
        res.send(error)
    }
 }