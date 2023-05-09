import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import {oneResDetails,newResDetails} from '../../helpers/ownerHelper'


function EditRestaurant() {
  const navigate=useNavigate()
  const {id}=useParams()
  const [res,setRes]=useState([])
  console.log(res,'namma res only');
  const [image,setImage]=useState('')
  const [resName,setResName]=useState('')
  const [resAddress,setResAddress]=useState('')
  const [numberOfTables,setTables]=useState('')
 
  const [phone,setPhone]=useState('')





  console.log(id,'namma  id');
  useEffect(()=>{
    oneResDetails(id).then((resDetails)=>{

      console.log(resDetails,'resDetails');
      setRes(resDetails.data.res)
      setResName(resDetails.data.res.resName)
      setResAddress(resDetails.data.res.resAddress)
      setTables(resDetails.data.res.numberOfTables)
       setPhone(resDetails.data.res.phone)
    })
  },[])

  const secureUrl = res?.resImages && res?.resImages?.length > 0 ? res?.resImages[0]?.secure_url : '';
  console.log(secureUrl,'secureUrl');
  const handleImage=(e)=>{
    const file=e.target.files[0]
    TransformFile(file)
   }
   const TransformFile=(file)=>{
    const reader=new FileReader()
    if(file){
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        setImage(reader.result)
      }
    }else{
      setImage("")
    }
  }
  const formik=useFormik({
    initialValues:{
        resName:'',
        resAddress:'',
        numberOfTables:'',
        phone:''
    },
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:()=>{
      let img={image:image}

      const credentials={
        resName,
        resAddress,
        numberOfTables,
        phone,
        id
      }
      console.log(credentials);
      const imgCopy=Object.assign({},credentials,img)
      let newDetails=newResDetails(imgCopy)
      toast.promise(newDetails,{
        loading:'updating...',
        success:<b>edited successfully</b>,
        error:<b>failed to edit</b>
      })
      newDetails.then((data)=>{
        if(data){
         navigate('/owner-home')
        }
      })
    }
  })
  return (
    <div>
      <div className='p-10'>
    {/* <Toaster position='top-center' reverseOrder={false} ></Toaster> */}
      

        <form onSubmit={formik.handleSubmit} className="mx-auto max-w-lg">
      <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
        Restaurant Name
      </label>
      <input
      name='resName'
       value={resName}
       onChange={(e)=>{setResName(e.target.value)}}
        className="w-full border border-gray-400 p-2 rounded-md mb-4"
        type="text"
        id="name"
      
      />
     
   
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
       Address
      </label>
      <input
      name='resAddress'
       value={resAddress}
       onChange={(e)=>{setResAddress(e.target.value)}}
        className="w-full border border-gray-400 p-2 rounded-md mb-4"
        type="text"
        id="name"
    
      
      />
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
     Number Of Tables
      </label>
      <input
         name='numberOfTables'
         value={numberOfTables}
         onChange={(e)=>{setTables(e.target.value)}}
        className="w-full border border-gray-400 p-2 rounded-md mb-4"
        type="number"
        id="name"
     
      
      />
      


        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
       Phone
      </label>
      <input
      name='phone'
      value={phone}
      onChange={(e)=>{setPhone(e.target.value)}}
        className="w-full border border-gray-400 p-2 rounded-md mb-4"
        type="text"
        id="name"
     
      
      />

<div className='py-5'>
<input 
onChange={handleImage}

id="file" name="resImages" type="file"
className="file-input file-input-bordered file-input-accent w-full max-w-xs" />

<img className='py-4' width="200px" height="200px" src={image?image:secureUrl}></img>
</div>

<div className='space-x-5'>


      <button className= " bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" type="submit">
      Submit
      </button>
    
      <button 
      type='submit'
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" >
      
      Back
      </button>
      
</div>
      
    </form>
    </div>
    </div>
  )
}

export default EditRestaurant
