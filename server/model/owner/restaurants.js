const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema

const restaurantSchema=mongoose.Schema({
   
    resName:{
        type:String,
        required:true,

    },
    numberOfTables:{
        type:Number,
        required:true
    },
    resAddress:{
        type:String,
        required:true
    },
    startTime:{
       type:String
    },
    endTime:{
    type:String
    },
    
wifi:{
    type:Boolean,
    default:false,
},
parking:{
    type:Boolean,
    default:false,
},
Ac:{
    type:Boolean,
    default:false,
},
ownerId:{
    type:mongoose.Schema.Types.ObjectId
    },
    
    resImages:{
        type:Array,
        required:true
    },
    phone:{
        type:Number,
    }
})


module.exports=mongoose.model('Restaurants',restaurantSchema)
