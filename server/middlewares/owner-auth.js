const jwt=require('jsonwebtoken')


//varify admin

exports.varifyToken=(req,res,next)=>{
    try {
        
        const authToken=req.headers['authorization']
        console.log(authToken,'headers');
      
        const token = authToken && authToken.split(' ')[1]
        console.log(token,'token');
        if(!token){
            console.log(token,'asdfghjkl');
            res.status(401).send({msg:'no token'})
        }
        jwt.verify(token,process.env.JWT_OWNER_KEY,(err,admin)=>{
            console.log(admin,'admin inda');
            // console.log(process.env.JWT_KEY,'namma key');
            if(err){
                console.log(err,'asdfghjkl');
              return  res.status(500).send({msg:err})
            }else{

                next()
            }
            
        })
    } catch (error) {
        console.log(error.message,'errrrrr');
    }
}
