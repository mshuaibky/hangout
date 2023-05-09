const jwt=require('jsonwebtoken')
const {adminLogin}=require('../controller/admin')


//varify admin

exports.varifyToken=(req,res,next)=>{
    try {
        
        const token=req.headers['authorization']
        // console.log(headers,'headers');
      
        console.log(token,'token');
        if(!token){
            res.status(401).send({msg:'no token'})
        }
        jwt.verify(token,process.env.JWT_KEY,(err,admin)=>{
            console.log(admin,'admin inda');
            // console.log(process.env.JWT_KEY,'namma key');
            if(err){
              return  res.status(500).send({msg:err})
            }
            console.log(admin);
        })
          next()
    } catch (error) {
        console.log(error.message);
    }
}