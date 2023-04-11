const mongoose=require('mongoose')


const userSchema=mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      userinfo: {
        type: String,
        trim: true,
      },
      password: {
        type: String,
       
      },
     
      role: {
        type: Number,
        default: 0,
      },
      
    },{timeStamps:true}
)

module.exports=mongoose.model('User',userSchema)