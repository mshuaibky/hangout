const mongoose=require('mongoose')

const ownerSchema=mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
  
   isOwner:{
      type:Boolean,
      default:false
   },
   isLoggedIn:{
     type:Boolean,
     default:false
   },
    password:{
        type:String,
    },
   
})

module.exports=mongoose.model('Owner',ownerSchema)