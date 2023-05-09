import React from 'react'
import { useState ,useEffect} from 'react'
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'
import { getResDetais,deleteRes } from '../../helpers/ownerHelper'

 function AddRestaurant() {
  const ownerId=localStorage.getItem('ownerId');
console.log(ownerId,'namma ownerId');
  const [details,setDetails]=useState([])
  console.log(details,'nama details');


  useEffect(()=>{
    async function fetchData() {
      let data = await getResDetais(ownerId);
      console.log(data,'useEffect data');
      setDetails(data?.data?.data);
    }
    fetchData();
  },[]);

  const handleDelte=async(resId,ownerId)=>{
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
        let result=await deleteRes(resId,ownerId)
        setDetails(result?.data?.details)
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
      <Link to='/add-restaurant'>
     <button
    class=" rounded-md border border-green-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-green-600 hover:bg-green-300">
 Add Restaurant
  </button></Link>
 
  </div>
   <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
   {details?.map((data)=>{
    return(
      <div
        key='id'
        className="rounded overflow-hidden shadow-lg dark:shadow-gray-800"
      >
{data?.resImages?.map((image)=>{
      return(  <img className="h-48 w-96 object-cover" src={image?.secure_url} alt="Mountain" />)
      })}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{data.resName}</div>
          <p className="text-gray-700 dark:text-gray-300 text-base">
         {data?.resAddress}
          </p>
          <div className=" text-xl mb-2">Tables have:{data?.numberOfTables}</div>
          <p className="text-gray-700 dark:text-gray-300 text-base">
         {data?.phone}
          </p>

        </div>
        <div className="px-6 pt-2 pb-2">
        
            <span
              key='tag'
              className="inline-block bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2"
            >
         {data?.resAddress}
            </span>
        </div>
        <div className='px-6 py-2 space-x-2'>

      <Link to={`/owner/edit-restaurant/${data?._id}`}>  <button  className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500" >Edit</button></Link> 
         <button onClick={()=>{handleDelte(data?._id,ownerId)}} className="rounded-md bg-red-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-red-500">Delete</button>

        </div>
      </div>)
      })
 }
  </div>
 
  </div>
  )
}

export default AddRestaurant
