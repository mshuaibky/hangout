import React,{useState,useEffect} from 'react'
import { getRestaurant } from '../../helpers/adminHelpers'
function RestaurantList() {
    const [res,setRes]=useState([])
    useEffect(()=>{
        getRestaurant().then((data)=>{
            console.log(data,'data');
            setRes(data?.data?.data)
        })
    },[])
  return (
    <div>
          <div className='mx-5'>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
   Restaurants
            </h2>
         
          </div>
        
         
<div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Image</span>
                </th>
                <th scope="col" class="px-6 py-3">
                 Restaurant Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Address
                </th>
                <th scope="col" class="px-6 py-3">
                 Number Of Tables
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        {
            res?.map((data)=>{
                return(
        <tbody>
        
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-32 p-4">
                   
                    <img src={data?.resImages[0]?.secure_url} alt="Iphone 12"/>
                   
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {data.resName}
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {data.resAddress}
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {data.numberOfTables}
                </td>
               
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                </td>
            </tr>
        </tbody>)
            })
        }
    </table>
</div>

    </div>
  )
}

export default RestaurantList
