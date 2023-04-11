const express=require('express')
const app=express()
require('dotenv').config()
const cors=require('cors')
const morgan=require('morgan')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')

const userRoutes=require('./routes/user')
app.use(cors({
    origin:["http://localhost:3000"],credentials:true,origin:true
}))
app.use(morgan('combined'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true}));

//DB connection
mongoose.connect(process.env.DATABASE).then(()=>{
    console.log('DB CONNECTED');
}).catch((error)=>{
    console.log(error.message);
})

app.use('/',userRoutes)

//port
const port =process.env.PORT

//starting app
app.listen(port,()=>{
    console.log(`app is running in port ${port} succesfully`);
})
