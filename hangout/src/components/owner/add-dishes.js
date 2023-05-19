import React,{useState,useEffect} from 'react'
import {useFormik} from 'formik'
import {Home} from 'lucide-react'
import toast, {Toaster} from 'react-hot-toast'
import{useNavigate,Link} from 'react-router-dom'
import { dishDetails } from '../../helpers/ownerHelper'



function Add_Dish() {
  const navigate=useNavigate()
  const ownerId = localStorage.getItem('ownerId');
const [image,setImage]=useState('')

const validate=values=>{
  const errors={}

  if(!values.name){
    errors.name = toast.error('name is required')
}else if(values.name.length < 4){
    errors.name = toast.error('name should contain atleast Four characters')
}


else if(!values.price){
  errors.price = toast.error("price is required")
}else if(isNaN(values.price)){
  errors.price = toast.error("enter a valid price")
}

else if(!values.catagory){
  errors.catagory=toast.error('catagory is required')
}
else if(!image){
  errors.image=toast.error('image is required')
}
  return errors
}
// const validateFile=(image)=>{
//     if (!image) {
//       setError("please upload a file");
//       return false;
//     }
//   }
  // useEffect(() => {
  //   if (image !== null) {
  //     const isValid = validateFile(image);
  //     if (!isValid) {
  //       setImage(null);
  //     }
  //   }
  // }, []);
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
      <nav className="m-3 flex  min-w-fit items-start rounded-md bg-gray-100 p-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to={'/owner-home'}
            href="#"
            className="ml-1 inline-flex text-sm font-medium text-gray-800 hover:underline md:ml-2"
          >
            <Home className="mr-4 h-4 w-4" />
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <span className="mx-2.5 text-gray-800 ">/</span>
            <Link to={'/owner/view-dish'}
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
        type="tel"
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
 {
  image?
<img className='py-4' width="200px" height="200px" src={image }></img>:""
 }
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
