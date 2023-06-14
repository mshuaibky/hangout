const mongoose=require('mongoose')

const orderSchema=mongoose.Schema({
   orderDetails:{
    type:Array
   },
   tableNo:{
    type:Number,   
   },
   orderType:{
    type:String
   },
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
   },
   ownerId:{
      type:mongoose.Schema.Types.ObjectId
   },
   total:{
    type:String,
  
   },
   time:{
     type:String
   },
   date:{
      type:Date
   },
   isBooked:{
      type:Boolean,
      default:false
   },
   isReserved:{
      type:Boolean,
      default:false
   },
   isCancelled:{
      type:Boolean,
      default:false
   }
}, { timestamps: true })

module.exports=mongoose.model('Order',orderSchema)