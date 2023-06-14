import React,{useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom';
import {getOneOrder } from '../../helpers/ownerHelper';
import moment from 'moment'

function OrderView() {
    const {id}=useParams()
    const [order,setOrder]=useState([])
    const timestamp =order.updatedAt
    const date = moment(timestamp).format("YYYY-MM-DD");
  
    useEffect(()=>{
        getOneOrder(id).then((data)=>{
           setOrder(data?.data?.data)
        })
    },[])
  return (
    <div>
        <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
      <h2 className="text-3xl font-bold">Order Details</h2>
      <div className="mt-3 text-sm">
      orderId: {order._id}
      </div>
      <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
        <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
          <div className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
              
                <div key='' className="mb-4">
                  <div className="text-sm font-semibold">Date</div>
                  <div className="text-sm font-medium text-gray-700">{date}</div>
                </div>
                <div key='' className="mb-4">
                  <div className="text-sm font-semibold">Time</div>
                  <div className="text-sm font-medium text-gray-700">{order.time}</div>
                </div>
                <div key='' className="mb-4">
                  <div className="text-sm font-semibold">Table NO</div>
                  <div className="text-sm font-medium text-gray-700">{order.tableNo}</div>
                </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
            {
                order?.orderDetails?.map((data)=>{
                    console.log(data,'namma data');
                    return(
          <div className="p-8">
            <ul className="-my-7 divide-y divide-gray-200">
             
                <li
                  key=''
                  className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                >
                  <div className="flex flex-1 items-stretch">
                    <div className="flex-shrink-0">
                        {
                            data?.image?.map((image)=>{
                                return(
                      <img
                        className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                      src={image?.secure_url}
                      />
                      )
                            })
                        }
                    </div>

                    <div className="ml-5 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">{data.name}</p>
                        <p className="mt-1.5 text-sm font-medium text-gray-500">catagory:{data.catagory}</p>

                        <p className="mt-1.5 text-sm font-medium text-gray-500">{order.orderType}</p>
                       {
                        order.isCancelled?
                        <p className="mt-1.5 text-sm font-medium text-red-500">Cancelled</p>
                            :""
                       }
                      </div>

                      <p className="mt-4 text-sm font-medium text-gray-500">quantity:{data.count}</p>
                    </div>
                  </div>

                  <div className="ml-auto flex flex-col items-end justify-between">
                    <p className="text-right text-sm font-bold text-gray-900">Total:{data.total}</p>
                  </div>
                </li>
            
            </ul>
          
          </div>
          )
        })
    }
        </div>
      </div>
    </div>
    </div>
  )
}

export default OrderView
