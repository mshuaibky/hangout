const mongoose=require('mongoose')

const ratingSchema=mongoose.Schema({
   comment:{
    type:String,
  
   },
   rating:{
    type:String
   },
   ownerId:{
    type:mongoose.Schema.Types.ObjectId
   },
   name:{
      type:String
   }
})

module.exports=mongoose.model('Rating',ratingSchema)