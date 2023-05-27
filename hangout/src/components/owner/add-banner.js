import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import {Home} from 'lucide-react'
import toast, {Toaster} from 'react-hot-toast'
import {bannerDetails}  from "../../helpers/ownerHelper"

function AddBanner() {
  const validate=values=>{
    const error={}

      if(!image){
     error.image=toast.error('image is required')
      }
      return  error
    }
    const ownerId = localStorage.getItem('ownerId');
    const [image,setImage]=useState('')
    const navigate=useNavigate()
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
            mainDiscription:'',
            subDiscription:'',

        },
        validate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values=>{
            let img={image:image}
            let id={ownerId:ownerId}
            const imgCopy=Object.assign({},values,img,id)
            console.log(imgCopy,'namma imageCopy');
            let details=bannerDetails(imgCopy)
            toast.promise(details,{
                loading:'adding...',
                success:<b>added succesfullly</b>,
                error:<b>failed to add banner</b>
            })
            details.then((data)=>{
                if(data){
                    navigate('/owner/banner')
                }
            })
        }
      })
  return (
    <div>
       <nav className="m-3 flex  min-w-fit items-start rounded-md bg-gray-100 p-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to={'/owner-home'}
         
            className="ml-1 inline-flex text-sm font-medium text-gray-800 hover:underline md:ml-2"
          >
            <Home className="mr-4 h-4 w-4" />
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <span className="mx-2.5 text-gray-800 ">/</span>
            <Link to={'/owner/banner'}
             href="#" className="ml-1 text-sm font-medium text-gray-800 hover:underline md:ml-2">
             Dishes
            </Link>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <span className="mx-2.5 text-gray-800 ">/</span>
            <span className="ml-1 text-sm font-medium text-gray-800 hover:underline md:ml-2">
             Add Dishes
            </span>
          </div>
        </li>
      </ol>
    </nav>
    <div  className='rounded-md shadow-md  bg-slate-200   border-gray-700  p-3 m-4'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      

        <form onSubmit={formik.handleSubmit}className="mx-auto max-w-lg">
      <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
        Main Discription
      </label>
      <input
      name='mainDiscription'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.mainDiscription}
        className="w-full border border-gray-400 p-2 rounded-md mb-4"
        type="text"
        id="name"
      
      />
     
   
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
      subDiscription
      </label>
      <input
      name='subDiscription'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.subDiscription}
        className="w-full border border-gray-400 p-2 rounded-md mb-4"
        type="tel"
        id="name"
    
      
      />
       
      



<div className='py-5'>
<input 
onChange={handleImage}
id="file" name="Images" type="file"
className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
 {
  image?
<img className='py-4' width="200px" height="200px" src={image }></img>:""
 }
</div>

<div className='space-x-5'>


      <button className= " bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" type="submit">
      Submit
      </button>
    
    
      
</div>
      
    </form>
    </div>

    </div>
  )
}

export default AddBanner
