const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema


const tableSchema=mongoose.Schema({
   number:{
    type:Number
   },
   isBooked:{
    type:Boolean,
    default:false
   },
   ownerId:{
      type:mongoose.Schema.Types.ObjectId
      },
})
module.exports=mongoose.model('Table',tableSchema)
