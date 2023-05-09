import React,{useState,useEffect} from 'react'
import {useFormik} from 'formik'
import toast, {Toaster} from 'react-hot-toast'
import{useNavigate} from 'react-router-dom'
import { dishDetails } from '../../helpers/ownerHelper'

const validate=values=>{
    const errors={}

    return errors
}

function Add_Dish() {
  const navigate=useNavigate()
  const ownerId = localStorage.getItem('ownerId');
const [image,setImage]=useState('')
const [error,setError]=useState('')
const validateFile=(image)=>{
    if (!image) {
      setError("please upload a file");
      return false;
    }
  }
  useEffect(() => {
    if (image !== null) {
      const isValid = validateFile(image);
      if (!isValid) {
        setImage(null);
      }
    }
  }, []);
    const handleImage=(e)=>{
        const file=e.target.files[0]
        TransformFile(file)
      };
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
            name:'',
            price:'',
            catagory:''
        },
        validate,
         validateOnBlur:false,
         validateOnChange:false,
         onSubmit:async values=>{
            let img={image:image}
            let id={ownerId:ownerId}
            const imgCopy=Object.assign({},values,img,id)
            console.log(imgCopy,'desh image');
            let details=dishDetails(imgCopy)
            toast.promise(details,{
                loading:'adding...',
                success:<b>added successfully</b>,
                error:<b>failed to add dish</b>
            })
            details.then((data)=>{
                if(data){
                   navigate('/owner/view-dish')
                }
            })
         }
    })
  return (
    <div>
      <div className='p-10'>
      

        <form onSubmit={formik.handleSubmit}className="mx-auto max-w-lg">
      <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
        Name
      </label>
      <input
      name='name'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.name}
        className="w-full border border-gray-400 p-2 rounded-md mb-4"
        type="text"
        id="name"
      
      />
     
   
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
      price
      </label>
      <input
      name='price'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.price}
        className="w-full border border-gray-400 p-2 rounded-md mb-4"
        type="number"
        id="name"
    
      
      />
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
    catagory
      </label>
      <input
         name='catagory'
         onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.catagory}
        className="w-full border border-gray-400 p-2 rounded-md mb-4"
        type="text"
        id="name"
     
      
      />
      



<div className='py-5'>
<input 
onChange={handleImage}
id="file" name="Images" type="file"
className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
 
 {image==null ? <p style={{color:'red'}}>{error}</p>:""}
    {image?
<img className='py-4' width="200px" height="200px" src={image }></img>:""}
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

export default Add_Dish
