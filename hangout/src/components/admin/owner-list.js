import React,{useState,useEffect} from 'react'
import Image from '../../assets/Scate.png'
import Swal from 'sweetalert2'
import {getOwnerDetails,blockOwner,AcceptUser} from '../../helpers/adminHelpers'
function OwnerList() {
    
    const [data,setData]=useState([])
 

    useEffect(()=>{
        async function getData(){
            let data=await getOwnerDetails()
                setData(data.data.data)
            
        }
        getData();
    },[])
    const handleClick=async(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, block it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
                let datas= await blockOwner(id)
                setData(datas)
              Swal.fire(
                'Blocked!',
                'Owner is  Blocked.',
                'success'
              )
            }
          })
    
    }
    const handle=async(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Accept it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
                let data= await AcceptUser(id)
                setData(data)
              Swal.fire(
                'Accepted',
                'Request Accepted',
                'success'
              )
            }
          })
    
    }
  return (
    <div>
       <section className="container px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Owners
            </h2>
         
          </div>
        
        </div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span>Full Name</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Email
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                 fssai Code
                      </th>
                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                 {
                    data.map((data)=>{
                  return(
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  
                      <tr key='key'>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={Image}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                               
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-300">
                       {data.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                      
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                       {data.email}
                          </div>
                        </td>
                      {
                        data.isOwner?
                        <td className="px-4 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                       Active
                        </span>
                      </td>:
                        <td className="px-4 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                       InActive
                        </span>
                      </td>
                      }
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                 {data.code}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          
                           {data.isOwner?
                            <button onClick={()=>handleClick(data._id)} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-20">
                            block
                           </button>:
                             <button onClick={()=>handle(data._id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-20">
                             Accept
                            </button>
                           
                           }
                      
                     
                        </td>
                      </tr>
                   
                  </tbody>)
                     
                    })
                }
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OwnerList
