const Admin=require('../model/admin/admin')
const User=require('../model/user/user')
const Owner=require('../model/owner/owner')
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
               const token=jwt.sign({id:admin[0]._id},process.env.JWT_KEY,{
                expiresIn:"1hr" 
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