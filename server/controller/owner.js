const Owner=require('../model/owner/owner')
const Table=require('../model/owner/table')
const bcrypt = require('bcrypt');
const cloudinary=require('../util/cloudinary')
const Restaurants=require('../model/owner/restaurants')
const Dishes=require('../model/owner/dishes'); 
const Details=require('../model/owner/details-restaurant')
let ObjectId=require('mongoose').Types.ObjectId

//owner register
exports.signUp=async(req,res)=>{
    try {
    const {name,email,password}=req.body
    
    const checkName = new Promise((resolve, reject) => {
        if (!name || name?.length < 4) {
            reject(new Error('please enter a valid name'))
        } else {
            resolve()
        }
    })
   const checkEmail=new Promise((resolve,reject)=>{
      Owner.findOne({email}).then((email)=>{
        if(email){
            reject(new Error('Email already exists'))
        }else{
            resolve()
        }
      })
   })
   Promise.all([checkName,checkEmail]).then(()=>{
    if(password){
   bcrypt.hash(password,10,function(err,hash){
    if(err){
        res.status(500).json({msg:err})
    }
   const newOwner=new Owner({
    name,
    email,
    password:hash

   })
   newOwner.save().then((user)=>{
    res.status(200).json({msg:'owner created succesfully'})
   })
      })
    }
   }).catch((error)=>{
    res.status(500).json({error:error.message})
   })
    } catch (error) {
       res.status(500).json({error:error}) 
    }
}

//owner login
exports.login=async(req,res)=>{
    console.log(req.body,'namm body');
 try {
    const {email,password}=req.body
   let owner=await Details.find({email})
   if(owner.length >0){
    let regOwner=await Owner.find({email})
    console.log(regOwner,'regowner');
     if(regOwner){
        console.log('nooo');
        let validOwner = await bcrypt.compare(password,regOwner[0].password)
      
        if(validOwner){
           if(regOwner[0].isOwner){
          
            res.status(200).send({data:regOwner})
           }else{
            res.status(401).send({msg:'your account is not activated'})
           }
        }else{
            res.status(401).send({msg:'incorrect password'})

        }
     }else{
        res.status(401).send({msg:'please register in Hangout'})
     }
   }else{
    console.log('error');
    res.status(401).send({msg:'Email not found'})

   }
 } catch (error) {
    res.status(500).send({msg:error,data:'email error'})
 }
}


//adding restaurant
exports.resDetails=(async(req,res)=>{
    console.log(req.body,'req.body');
    const {resName,resAddress,numberOfTables,phone,image,wifi,parking,Ac,ownerId,imageTwo}=req.body
    
    try {
     const result=await cloudinary.uploader.upload(image,{
        upload_preset:'restaurant',
     })
     const resultTwo=await cloudinary.uploader.upload(imageTwo,{
        upload_preset:'restaurant',
     })
     
     if(result){
        const addRestaurant = new Restaurants({
            resName,
            resAddress,
            numberOfTables,
            phone,
            wifi,
            parking,
            Ac,
            ownerId,
            resImages:[result,resultTwo]
        });
        addRestaurant.save().then(()=>{
            console.log("data added");
            res.status(200).send({success:"restaurant added successfully"});
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({err:"something went wrong"})
        })
        
    }else{
        console.log("something wrong");
    }
    
    } catch (error) {
        
    }
})

exports.getRestaurants=async(req,res)=>{
    try {
       const {id}=req.params
       const details= await Restaurants.find({ownerId:new ObjectId(id)})
       if(details){
        res.status(200).send({data:details})
       }
       console.log(details,'namma details');
    } catch (error) {
      res.send(error.message)  
    }
}
exports.dishDetails=async(req,res)=>{
    console.log(req.body,'body');
    try {
        const {name,price,catagory,image,ownerId}=req.body
        const result=await cloudinary.uploader.upload(image,{
            upload_preset:'restaurant',
        })
        console.log(result,'cloudinery');
        if(result){
            const addDish=new Dishes({
                name,
                price,
                catagory,
                ownerId,
                image:result
            })
            console.log(addDish,'namma dishes');
            addDish.save().then(()=>{
                res.status(200).send({msg:'dish added successfully'})
            }).catch((error)=>{
                res.status(500).send({msg:error,error:'some error'})
            })
        }else{
            console.log('something went wrong');
        }
    } catch (error) {
        res.send(error.message)
    }
}

exports.getDishDetails=async(req,res)=>{
    try {
       console.log(req.params.id,'owner id'); 
       const {id}=req.params
       const dishData=await Dishes.find({ownerId:new ObjectId(id)})
console.log(dishData,'dish data');
if(dishData){
    res.status(200).send({dishData:dishData})
}else{
    res.send(500).send({msg:'cannot get dish data'})
}
    } catch (error) {
        console.log(error);
    }
}

//delete Dish

exports.deleteDish=async(req,res)=>{
    try {
      const {dishId,ownerId}=req.params
      const result=await Dishes.findByIdAndDelete(dishId)
      if(result){
        const dishes=await Dishes.find({ownerId})
        res.status(200).send({dish:dishes})
      }else{
        res.status(500).send({msg:'cant delete'})
      }
    } catch (error) {
        res.send(error)
    }
}
//get one dish

exports.OneDish=async(req,res)=>{
    try {
        const {id}=req.params
        const singleDish= await Dishes.findById(id)
        if(singleDish){
            res.status(200).send({dish:singleDish})
        }
    } catch (error) {
        res.send(error)
    }
}
//edit dish

exports.editDish=async(req,res)=>{
    console.log(req.body,'namma body');
    try {
      const {name,price,catagory,image,id}=req.body
      const result=await cloudinary.uploader.upload(image,{
        upload_preset:'restaurant',
    })

    if(result){
        const newDish= await Dishes.updateOne({_id:id},{
            $set:{  
            name:name,
            price:price,
            catagory:catagory,
            image:result
            }
        })
        console.log(newDish,'namma dish');
        if(newDish){
            res.status(200).send({dish:newDish})
        }
    }
    } catch (error) {
        res.send(error)
        console.log(error,'error');
    }
}
//delete Restaurant
exports.deleteRestaurant=async(req,res)=>{
    // console.log(req.params,'namma params');
    try {

        const {resId,ownerId}=req.params
        const result=await Restaurants.findByIdAndDelete(resId)
   
        if(result){
            const ResDetails=await Restaurants.find({ownerId})
            console.log(ResDetails,'resDetails');
            res.status(200).send({details:ResDetails})
        }
    } catch (error) {
        
    }
}

//get One res Details

exports.oneResDetails=async(req,res)=>{
    try {
        const {id}=req.params
        const singleRes=await Restaurants.findById(id)
        if(singleRes){
            res.status(200).send({res:singleRes})
        }
    } catch (error) {
        res.send(error)
    }
}

//edit res

exports.editRes=async(req,res)=>{
    console.log(req.body,'namma body');
    try {
        
        const {resName,resAddress,numberOfTables,phone,id,image,imageTwo}=req.body
        const result=await cloudinary.uploader.upload(image,{
          upload_preset:'restaurant',
        })
        const resultTwo=await cloudinary.uploader.upload(imageTwo,{
            upload_preset:'restaurant',
          })
        console.log(result,'namma result in cloudinery');
        if(result){
          const newRes=await Restaurants.updateOne({_id:id},{
              $set:{
                  resName:resName,
                  resAddress:resAddress,
                  numberOfTables:numberOfTables,
                  phone:phone,
                  resImages:[result,resultTwo]
              }
          })
          console.log(newRes);
          if(newRes){
              res.status(200).send({res:newRes})
          }
        }
    } catch (error) {
        res.send(error)
    }
}

//adding proper owner Details

exports.properDetails=async(req,res)=>{
    try {
        const {Name,code,phone,image,email}=req.body
        const result=await cloudinary.uploader.upload(image,{
            upload_preset:'restaurant',
        })
        
        const Url=result.secure_url
        console.log(Url,'namma Url');
      let registeredOwner=await Owner.findOne({email})
      console.log(registeredOwner,'registered owner');
      if(registeredOwner){
        let properDetails=new Details({
            name:Name,
            code,
            email,
            phone,
            ownerId:registeredOwner._id,
            image:Url
        })
        properDetails.save().then((response)=>{
            if(response){
                res.status(200).send({proper:properDetails})
            }else{
                res.status(500).send({msg:'something went wrong'})
            }
        })
      }else{
        res.status(401).send({msg:'please Register first!'})
      }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({msg:error})
    }
}
//adding Table
exports.addTable=(req,res)=>{
    console.log(req.body,'table');
    try {
        const {number,ownerId}=req.body
      let table=new Table({
        number,
        ownerId,
      })
      table.save().then((response)=>{
       if(response){
        res.status(200).send({msg:'saved successfully'})
       }else{
        res.status(500).send({msg:'something went wrong'})
       }
      })
    } catch (error) {
        res.send(error)
    }
}
//getting all table details
exports.getAllTableDetails=async(req,res)=>{
    try {
        const {id}=req.params
        console.log(id,'namm aid ');
        let tableDetails=await Table.find({ownerId:new ObjectId(id)})
        console.log(tableDetails,'ella tablem');
        if(tableDetails){
            res.status(200).send({data:tableDetails})
        }else{
            res.status(500).send({msg:'something went wrong'})
        }
    } catch (error) {
        res.send(error)
    }
}