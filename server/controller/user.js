const User = require('../model/user/user')
const Dish=require('../model/owner/dishes')
const Table=require('../model/owner/table')
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
      console.log(data,'table data');
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
    console.log(req.body,'checkout body');
}