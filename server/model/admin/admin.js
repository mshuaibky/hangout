const mongoose=require('mongoose')

const adminSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('Admin',adminSchema)