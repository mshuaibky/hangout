const User = require('../model/user/user')
const Dish=require('../model/owner/dishes')
const Table=require('../model/owner/table')
const Order=require('../model/user/order')
const Rating=require('../model/user/rating')
const moment=require('moment')
let ObjectId=require('mongoose').Types.ObjectId
const Restaurant=require('../model/owner/restaurants')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const maxAge = 1 * 24 * 60 * 60

const client = require('twilio')(process.env.ACCOUNT_SID,process.env.AUTH_TOKEN)

exports.register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body

        const checkName = new Promise((resolve, reject) => {
            if (!name || name?.length < 4) {
                reject(new Error('please enter a valid name'))
            } else {
                resolve()
            }
        })

        const checkEmail = new Promise((resolve, reject) => {
            User.findOne({ email }).then((email) => {
                if (email) {
                    // reject(new Error('Email is already exists'))
                    res.status(401).json({ msg: 'Email already exists' })
                } else {
                    resolve()
                }
            })

        })

        Promise.all([checkName, checkEmail]).then(() => {
            if (password) {
                bcrypt.hash(password, 10, function (err, hash) {
                    if (err) {
                        res.status(500).send({ msg: 'user already exists', err: err })
                    }
                    const newUser = new User({
                        name,
                        email,
                        phone,
                        password: hash
                    })
                    newUser.save().then((user) => {
                        console.log(user, 'namma user');
                        res.status(202).json({ success: 'registration success' })
                    })
                });
            }
        }).catch((error) => {
            res.status(500).send({ msg: error.message })
        })
    } catch (error) {
        res.send({ msg: error.message })

    }
}

//user Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email })

        console.log(user, 'namma user');
        if (user) {
            let validUser = await bcrypt.compare(password, user.password)
            if (validUser) {
                const update = await User.updateOne({email:email},{
                    $set:{user:true}
                })
                let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: maxAge })
                console.log(user._id, token, 'namma token and id');
                res.cookie('jwt', token, {
                    withCredentials: true,
                    httpOnly: false,
                    maxAge: maxAge
                })
                res.status(202).send({ msg: 'login success', user: user, token })
            }
            else {
                res.status(404).send({msg:'incorrect password'})
            }
        } else {
            res.status(500).send({msg:'incorrect email'})
        }
    } catch (error) {
        console.log(error);
        res.send({msg:error})
    }

}
//otp login
exports.recievingNumber = (req, res) => {
    try {
        const { phone } = req.body
        console.log(req.body, 'namma body');
        client.verify.v2
            .services(process.env.SID)
            .verifications.create({ to: `+91${phone}`, channel: "sms" })
            .then((verification) => {
                res.status(200).send({ response: verification })
            })

            
            
            
        } catch (error) {
            
        }
    }
    
    //verify Otp
exports.verify = (req, res) => {
   console.log(req.body);
   try {
    const {otp}=req.body
    client.verify.v2
    .services(process.env.SID)
    .verificationChecks.create({ to: "+917012597412", code:otp})
    .then((verification) => {
        res.status(200).send({response:verification})
    })
 
   } catch (error) {
    res.status(200).send({msg:error})
   }

}

//googleRegister
exports.googleRegister = async (req, res) => {
    try {
        const { fullName, email } = req.body._tokenResponse
        const user = await User.findOne({ email })
        console.log(user, 'user');
        if (user) {
            res.status(404).json({ message: 'already logged in' })
        } else {
            const user = new User({
                name: fullName,
                email: email
            })
            user.save().then((response) => {
                console.log(response);
                res.status(200).json({ message: 'succesfullly logged in' })
            }).catch((error) => {
                console.log(error.message);
            })
        }

    } catch (error) {

    }
}
//login with google
exports.googleLogin = async (req, res) => {
    try {
        const { email } = req.body._tokenResponse
        const user = await User.findOne({ email })
        if (user) {
            res.status(200).send({ msg: 'user exists' })
        } else {
            res.status(401).send({ msg: 'unautherised user' })
        }
    } catch (error) {
        res.send(error)
    }
}
//getting all restaurants

exports.getAllRestaurants=async(req,res)=>{
    try {
        let data=await Restaurant.find({})
        console.log(data,'all restaurants');
        if(data){
            res.status(200).send({data:data})
        }
    } catch (error) {
        res.send(error)
    }
}

//get specific dish using owner id

exports.getSpecificDish=async(req,res)=>{
    try {
        console.log(req.params.id,'owner id');
        const {id}=req.params
        let dishDetails=await Dish.find({ownerId:new ObjectId(id)})
        console.log(dishDetails,'namma dishDetails');
        if(dishDetails){
            res.status(200).send({data:dishDetails})
        }else{
            res.status(500).send({msg:'cannot get the data'})
        }
    } catch (error) {
        res.send(error)
    }
}
//get all tables

exports.tableData=async(req,res)=>{
    try {
        const {id}=req.params
      const data=await Table.find({ownerId:new ObjectId(id)})
   
      if(data){
        res.status(200).send({data:data})
      }else{
        res.status(500).send({msg:'something went wrong'})
      }
    } catch (error) {
        res.send(error)
    }

    
}



//checkout
exports.checkoutData=(req,res)=>{
    console.log(req.body.allDishData[0].total,'kkk');
   try {
    const {button,selectedValue,userId,date,time}= req.body
    let order= new Order({
     orderDetails:req.body.allDishData,
     total:req.body.allDishData[0].total,
     tableNo:button,
     orderType:selectedValue,
     userId,
     date,
     time
    })
   order.save().then((response)=>{
     console.log(response,'databaseREsponse');
     if(response){
         res.status(200).send({data:response})
     }else{
         res.status(500).send({msg:'something went wrong'})
     }
   })
   } catch (error) {
    res.send(error)
   }
}

//getting all orders

exports.getAllOrders=async(req,res)=>{
    try {
        const {id}=req.params
        console.log(id,'userId');
        const orders= await Order.find({userId:new ObjectId(id)})
        console.log(orders,'nmaa order');
    } catch (error) {
        
    }
}
//confirm payment
exports.confirmPayment=async(req,res)=>{
    console.log(req.body,' confirmpayment');
    try {
       const {ownerId,id}=req.body 
       let data=await Order.findByIdAndUpdate(id,{
        $set:{
            isBooked:true,
            ownerId:ownerId,
            isReserved:true
        }
       })
      console.log(data,'databaseData');
      if(data){
        res.status(200).send({data:data})
      }else{
        res.status(500).send({msg:'something went wrong'})
      }
    } catch (error) {
        res.send({msg:error})
    }
}
//getting orders by user
exports.getUserOrder=async(req,res)=>{
    try {
        const {id}=req.params
        let orders=await Order.find({userId:new ObjectId(id)})
    
        if(orders){
            res.status(200).send({data:orders})
        }else{
            res.status(500).send({msg:'something went wrong'})
        }
    } catch (error) {
        res.send(err)
    }
}
//getting the details of the orderd user
exports.getUserDetails=async(req,res)=>{
    try {
        const {id}=req.params
        console.log(id,'id');
        let user= await User.findById(id)
       
        if(user){
            res.status(200).send({data:user})
        }else{
            res.statu(500).send({msg:'something went wrong'})
        }
    } catch (error) {
        res.send(error)
    }
}
//getting paginated data

exports.paginatedData=async(req,res)=>{
   
try {
   const items_perPage=2
   const page=req.query.page||1
   const skip=Math.floor((page-1)*items_perPage)
   const query={}
   const count=await Restaurant.estimatedDocumentCount(query)
   const result= await Restaurant.find(query).limit(items_perPage).skip(skip)
   const pageCount=Math.floor(count/items_perPage)
  
    res.status(200).send({count:count,pageCount:pageCount,data:result})
} catch (error) {
    
}
}
//user paginated order

exports.paginatedOrderUser=async(req,res)=>{
    try {
        const items_perPage=2
        const page=req.query.page||1
        const skip=Math.floor((page-1)*items_perPage)
        const query={}
        const count=await Order.estimatedDocumentCount(query)
        const result= await Order.find(query).limit(items_perPage).skip(skip)
        const pageCount=Math.floor(count/items_perPage)
       
         res.status(200).send({count:count,pageCount:pageCount,data:result})
    } catch (error) {
        
    }
}
//getting all dishes
exports.getAlldish=async(req,res)=>{
    try {
       let dish=await Dish.find({})
      if(dish){
        res.status(200).send({data:dish})
      }else{
        res.status(500).send({msg:'no data found'})
      }
      
    } catch (error) {
        res.send(error)
    }
}
//getting booked orders
exports.bookedOrders=async(req,res)=>{
    console.log(req.query,'query');
    try {

        const{id,date,time}=req.query
        const outputFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
        const convertDate=moment(date).format(outputFormat)
        let orders=await Order.find({userId:new ObjectId(id)})
       if(orders){
       let bookedOrders=await Order.find({
        time:time,
       date:convertDate,
        isBooked:true
       })
       console.log(bookedOrders,'bookedOrders');
       if(bookedOrders){
        res.status(200).send({data:bookedOrders})
       }else{
        res.status(500).send({msg:'no data'})
       }
       }else{
        res.status(500).send({msg:'no data'})
       }
       
    } catch (error) {
       
       res.send(error)
    }
}
//adding review

exports.addRating=(req,res)=>{
    try {
        const {comment,rating,ownerId,name}=req.body
         let data= new Rating({
            comment,
            rating,
            ownerId,
            name
         })
     data.save().then((result)=>{
        console.log(result,'result');
        console.log('saved successfully');
     })
    } catch (error) {
        
    }
}

//getting reviews
exports.gettingReviews=async(req,res)=>{
    try {
const {id}=req.params
console.log(id,'iddd');
let reviews= await Rating.find({ownerId:new ObjectId(id)})   

if(reviews){
    res.status(200).send({data:reviews})
}else{
    res.status(500).send({msg:'something went wrong'})
}
    } catch (error) {
        res.send(error)
    }
}
//cancell order

exports.orderCancel=async(req,res)=>{
    try {
      
       
        const {id,userId} = req.params
        const data = await Order.findByIdAndUpdate(id,{
            $set:{
                isCancelled:true
            }
        })
  if(data){
    let orders=await Order.find({userId:new ObjectId(userId)})
   if(orders){
   
      
    const thatOrder=await Order.findById(id)
    console.log(thatOrder.total,'prorder');
   if(thatOrder){
    const walletUpdate=await User.findOneAndUpdate({_id:userId},{
        $inc:{
         wallet:parseInt(thatOrder.total)
        }
    })
    console.log(walletUpdate,'wallet');
    res.status(200).send({data:orders})
   }
   
}
  }
    } catch (error) {
        console.log(error,'error..');
    }
}
//user profile
exports.userProfile=async(req,res)=>{
    try {
        const {id} = req.params
       
        const user = await User.findById(id)
      if(user){
        const order = await Order.find({userId:new ObjectId(id)})
        if(order){
            const totalNo=await Order.estimatedDocumentCount()
            res.status(200).send({data:user,totalNo})
        }
      }else{
        res.status(500).send({msg:'cannot get user'})
      }
    } catch (error) {
       res.send(error)
    }
}
//logout user
exports.logoutUser=async(req,res)=>{
    try {
        const {id}=req.params
      const user = await User.findByIdAndUpdate(id,{
        user:false
      })
    if(user){
        res.status(200).send({data:user})
    }else{
        res.status(500).send({msg:'cannot logout'})
    }
    } catch (error) {
        res.send(error)
    }
}