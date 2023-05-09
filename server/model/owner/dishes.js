const mongoose=require('mongoose')

const dishSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    catagory:{
        type:String,
        required:true
    },
    ownerId:{
    type:mongoose.Schema.Types.ObjectId
    },
    image:{
        type:Array,

    },
    isAwailable:{
        type:Boolean
    }
})
module.exports=mongoose.model('Dishes',dishSchema)
