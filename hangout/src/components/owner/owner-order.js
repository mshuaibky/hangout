import React,{useEffect,useState} from 'react'
import { getOrders,getpaginatedOrder } from '../../helpers/ownerHelper';

function OwnerOrder() {
    const ownerId= localStorage.getItem('ownerId');
    console.log(ownerId,'dkdkk');
    const [order,setOrder]=useState([])
    const [page,setPage]=useState(1)
    const [pageCount,setPageCount]=useState(0)
 
    console.log(order?.orderDetails,'state order');
    useEffect(()=>{
    
    getpaginatedOrder(page,ownerId).then((data)=>{
       console.log(data,'paginated data');
       setOrder(data?.data?.data)
       if(data){
        setPageCount(data?.data?.pageCount)
       }
    })
    },[page])
    const handlePrev=()=>{

        setPage((p)=>{
           if(p===1)return p
           return p-1
        })
      }
   const handleNext=()=>{
       
   setPage((p)=>{
      
       if(p=== pageCount)return p 
       return p+1
   })
   }
  return (
    <div className="overflow-x-auto mt-3">
    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead className="ltr:text-left rtl:text-right">
        <tr>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Name
          </th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
       Catagory
          </th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Table NO
          </th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            price
          </th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
  
  {
    order.map((data)=>{
        return(
      <tbody className="text-center divide-y divide-gray-200">

  {
    data.orderDetails.map((items)=>{
      
        return(
        <tr>
          <td className=" whitespace-nowrap px-4 py-2 font-medium text-gray-900">
           {items.name}
          </td>
          <td className=" whitespace-nowrap px-4 py-2 text-gray-700">{items.catagory}</td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700">{data.tableNo}</td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700">{items.price}</td>
          <td className="whitespace-nowrap px-4 py-2">
            <a
              href="#"
              className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
            >
              View More
            </a>
          </td>
        </tr>
        )
    })
  }
      </tbody>
      )
    })
}
    </table>
     {/* pagination */}
     <div class="flex flex-col items-center mt-3">

 
  <div class="inline-flex mt-2 xs:mt-0">
      <button
        disabled={page===1}
        onClick={handlePrev}
        
      class="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Prev
      </button>
      <button 
       disabled ={page===pageCount}
       onClick={handleNext}
      class="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
      </button>
  </div>
</div>
   
              {/* end */}
  </div>
  )
}

export default OwnerOrder
