const mongoose=require('mongoose')

const detailsSchema=mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        
    },
    code:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone:{
        type:String,
        required:true,
       
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId
        },
    image:{
        type:Array,
       
    },
})

module.exports=mongoose.model('Details',detailsSchema)