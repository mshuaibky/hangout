import React,{useEffect,useState} from 'react'
import Swal from 'sweetalert2'

import { Link } from 'react-router-dom';
import {getDishDetails,dishDelete} from '../../helpers/ownerHelper'

function View_Dishes() {
  const ownerId=localStorage.getItem('ownerId');
  const [details,setData]=useState([])
  console.log(details,'namma details');

  useEffect(()=>{
   const  getData=async()=>{
    const dishDetails=await getDishDetails(ownerId)
    if(dishDetails){
      setData(dishDetails.data.dishData)
    }
   }
   getData();
  },[])

  const handleDelete=async(dishId,ownerId)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        let result=await dishDelete(dishId,ownerId)  
  
        setData(result.data.dish)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  
   
  }
  return (
    <div className='p-5'>
    <div className='px-10 space-x-2'>
     <Link to={'/owner/add-dish'}>
     <button
    className=" rounded-md border border-green-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-green-600 hover:bg-green-300">
 Add Dishes
  </button></Link>
 
  </div>
   <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
 {details.map((item)=>{
  
  return( 
   
      <div
        key='id'
        className="rounded overflow-hidden shadow-lg dark:shadow-gray-800"
      >
{item.image.map((image)=>{
  return(
    <img className="h-48 w-96 object-cover" src={image.secure_url} alt="Mountain" />)
  })}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{item.name}</div>
        
          <p className="text-gray-700 dark:text-gray-300 text-base">
       price:  {item.price}
          </p>

        </div>
        <div className="px-6 pt-2 pb-2">
        
            <span
              key='tag'
              className="inline-block bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2"
            >
         {item.catagory}
            </span>
        </div>
        <div className='px-6 py-2 space-x-2'>
{console.log(item._id,'namma id')}
        <Link to={`/owner/edit-dish/${item._id}`}>  <button  className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500" >edit</button></Link>
         <button onClick={()=>{handleDelete(item._id,ownerId)}} className="rounded-md bg-red-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-red-500">Delete</button>

        </div>
      </div>)
  
  })
 }  
  </div>
  </div>
  )
}

export default View_Dishes
