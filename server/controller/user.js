const User=require('../model/user')
const bcrypt = require('bcrypt');

exports.register=async(req,res)=>{
   try {
    const {name,email,password}=req.body

    const checkName=new Promise((resolve,reject)=>{
        if(!name||name?.length<4){
            reject(new Error('please enter a valid name'))
        }else{
            resolve()
        }
    })

    const checkEmail=new Promise((resolve,reject)=>{
        User.findOne({email}).then((email)=>{
            if(email){
                reject(new Error('Email is already exists'))
            }else{
                resolve()
            }
        })

    })

    Promise.all([checkName,checkEmail]).then(()=>{
        if(password){
            bcrypt.hash(password, 10, function(err, hash) {
            if(err){
                res.status(500).json({err:err})
            }
        const newUser=new User({
            name,
            email,
            password:hash
        })
        newUser.save().then((user)=>{
            console.log(user,'namma user');
            res.status(202).json({success:'registration success'})
        })
            });
        }
    }).catch((error)=>{
        res.status(500).json({err:error.message})
    })
   } catch (error) {
    res.status(500).json({err:error.message})
    
   }
}

exports.login=async(req,res)=>{
  try {
    const {email,password}=req.body
    let user=await User.findOne({email})
    
    console.log(user,'namma user');
    if(user){
        let validUser=await bcrypt.compare(password,user.password)
        if(validUser){
            res.status(202).send('login success')
        }
        else{
            res.status(404).send('account not found')
        }
    }else{
       res.status(500).send('login failed')
    }
  } catch (error) {
    res.send(error.message)
  }
    
}
//googleRegister
exports.googleRegister=async(req,res)=>{
   try {
  const {fullName,email  } =req.body._tokenResponse
  const user=await  User.findOne({email})
  console.log(user,'user');
        if(user){
          res.status(404).json({message:'already logged in'})
        }else{
            const user=new User({
                name:fullName,
                email:email
              })
              user.save().then((response)=>{
                 console.log(response);
                 res.status(200).json({message:'succesfullly logged in'})
              }).catch((error)=>{
                console.log(error.message);
              })
        }

   } catch (error) {
    
   }
}