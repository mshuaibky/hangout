const mongoose=require('mongoose')

const bannerSchema=mongoose.Schema({
    mainDiscription:{
        type:String,
        required:true,
        trim:true
    },
    subDiscription:{
        type:String,
        trim :true
    },
    image:{
        type:String
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId
        },
})

module.exports=mongoose.model('Banner',bannerSchema)