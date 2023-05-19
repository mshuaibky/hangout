import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import{useNavigate,Link} from 'react-router-dom'
import {Home} from 'lucide-react'
import toast, {Toaster} from 'react-hot-toast'

import {useFormik} from 'formik'
import {newDishDetails, oneDishDetails} from '../../helpers/ownerHelper'



function Edit_Dish() {
    const navigate=useNavigate()
    const {id}=useParams()
    
    
    const [dish,setDishes]=useState([])
    const [image,setImage]=useState('')
    
    let [name,setName]=useState('')
    let [price,setPrice]=useState('')
    let [catagory,setcatagory]=useState('')
    
 
    useEffect(() => {
        oneDishDetails(id).then((dishDetails) => {
          console.log(dishDetails?.data?.dish.name,'name');
          setDishes(dishDetails?.data?.dish);
          setName(dishDetails?.data?.dish.name)
          setPrice(dishDetails?.data?.dish?.price)
          setcatagory(dishDetails?.data?.dish?.catagory)
        });
      }, []);
      
      const secureUrl = dish?.image && dish.image.length > 0 ? dish.image[0].secure_url : '';
      console.log(secureUrl);

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
            name:'',
            price:'',
            catagory:''
        },
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:()=>{
            let img={image:image}
            const credentials={
                name,
                price,
                catagory,
                id,
            }
            const imgCopy=Object.assign({},credentials,img)
            let newDetails=newDishDetails(imgCopy)
            toast.promise(newDetails,{
                loading:'updating...',
                success:<b>edited successfully</b>,
                error:<b>failed to edit</b>
            })
            newDetails.then((data)=>{
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
             Edit Dishes
            </span>
          </div>
        </li>
      </ol>
    </nav>
       <div>
       <div  className='rounded-md shadow-md  bg-slate-200   border-gray-700  p-3 m-4'>

      

        <form onSubmit={formik.handleSubmit} className="mx-auto max-w-lg">
      <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
 Name
      </label>
      <input
      name='name'
      value={name}
      onChange={(e)=>{setName(e.target.value)}}
        className="w-full border border-gray-400 p-2 rounded-md mb-4"
        type="text"
        id="name"
      
      />
     
   
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
      price
      </label>
      <input
      name='price'
      onChange={(e)=>{setPrice(e.target.value)}}
        value={price}
        className="w-full border border-gray-400 p-2 rounded-md mb-4"
        type="number"
        id="name"
    
      
      />
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
    catagory
      </label>
      <input
      onChange={(e)=>{setcatagory(e.target.value)}}
         name='catagory'
        value={catagory}
        className="w-full border border-gray-400 p-2 rounded-md mb-4"
        type="text"
        id="name"
     
      
      />
      



<div className='py-5'>
<input 
onChange={handleImage}
id="file" name="Images" type="file"
className="file-input file-input-bordered file-input-accent w-full max-w-xs" />

<img className='py-4' width="200px" height="200px" src={image?image:secureUrl}></img>
</div>

<div className='space-x-5'>


      <button className= " bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" type="submit">
      Submit
      </button>
    
      {/* <button 
      type='submit'
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" >
      
      Back
      </button>
       */}
</div>
      
    </form>
    </div>
    </div>
    </div>
  )
}

export default Edit_Dish
