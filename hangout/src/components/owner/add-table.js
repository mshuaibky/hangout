import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import {getTableData} from '../../helpers/ownerHelper'

function AddTable() {
    const ownerId=localStorage.getItem('ownerId');
 
    const [data,setData]=useState([])
    console.log(data,'namma data');
    useEffect(()=>{
        getTableData(ownerId).then((data)=>{
            setData(data.data.data)
            console.log(data,'namma data');
        })
    },[])
    return (
        <div>


            <Link to={'/owner/table-form'}
                class="mt-6 mx-6 inline-block rounded bg-teal-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
               
            >
                Add table
            </Link>
                


            <div className="mt-7 mx-6 grid grid-cols-5 gap-1">
                {
                    data?.map((item)=>{
                  return(
                <button
                    type="button"
                    className="w-28 h-28 rounded-md bg-green-900 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                   <p>{item?.number}</p>
                   {
                    item?.isBooked?
                    <p>booked</p>: <p>Available</p>
                   }

                </button>)
                      
                    })
                }
               
            </div>
        </div>
    )
}

export default AddTable
