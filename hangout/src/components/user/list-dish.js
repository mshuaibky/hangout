import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { dishDetails } from '../../helpers/userHelpers'
import { Plus, Minus } from 'lucide-react'

function ListDish() {
    const { id } = useParams()
    // console.log(id, 'iddd');
    const [dishData, setDishData] = useState([])
    let [count, setCount] = useState(0)
    console.log(count,'namma count');
    useEffect(() => {
        dishDetails(id).then((dishDetails) => {          
            const updatedDishData = dishDetails.data.data.map(dish => ({ ...dish, count: 0 }));
        setDishData(updatedDishData);
        })
    }, [])
  
    const handleIncrement = (dishId) => {
        setDishData(prevDishData => {
            console.log(prevDishData,'previus Dish data');
            return prevDishData.map(dish => {
                if (dish._id === dishId) {
                    setCount(dish.count+1)
                    return { ...dish, count: dish.count + 1 };
                } else {
                    return dish;
                }
            });
        });
    };
    const handleDecrement=(dishId)=>{
        setDishData(prevDishData => {
            return prevDishData.map(dish => {
                if (dish._id === dishId) {
                    setCount(dish.count-1)
                    return { ...dish, count: dish.count - 1 };
                } else {
                    return dish;
                }
            });
        });
    }

    return (
        <div class="h-screen w-full flex bg-white-800">


            <main class="w-full overflow-y-auto">
                <div class="px-10 mt-5 mx-5 ">
                    <span class="uppercase font-bold text-2xl text-white"
                    >special food</span
                    >
                </div>
                <div class="px-10 grid grid-cols-3 gap-4 ">
                    {
                        dishData.map((items) => {

                            return (
                                <div
                                    class="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center"
                                >

                                    {
                                        items.image.map((data) => {
                                            return (
                                                <div class="bg-white rounded-lg mt-5">
                                                    <img
                                                        src={data.secure_url}
                                                        class="h-40 w-60 object-cover rounded"
                                                        alt=""
                                                    />
                                                </div>)

                                        })
                                    }
                                    <div class="bg-white shadow-lg rounded-lg -mt-4 w-64">
                                        <div class="py-5 px-5">
                                            <span class="font-bold text-gray-800 text-lg">{items.name}</span>
                                            <div class="flex items-center justify-between">
                                                <div class="text-sm text-gray-600 font-light">
                                                    Size : Regular
                                                </div>
                                                <div class="text-lg text-red-500 font-bold">
                                                    RS:{items.price}
                                                </div>
                                            </div>
                                            <div class=" mt-4 flex ">
                                                <div class="flex-none w-14 h-14 ...">
                                                    {
                                                        count<1?
                                                    <button
                                                    disabled
                                                       onClick={()=>{handleDecrement(items._id,items)}}
                                                        type="button"
                                                        className=" rounded-full bg-red-500 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>:
                                                      <button
                                                     
                                                         onClick={()=>{handleDecrement(items._id,items)}}
                                                          type="button"
                                                          className=" rounded-full bg-red-500 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                                                      >
                                                          <Minus className="h-4 w-4" />
                                                      </button>

                                                    }
                                                </div>
                                                <div class="grow h-14 w-10 ...">
                                                    <input type="text"
                                                        value={items.count}
                                                        class="border w-24 text-center
                                                   border-gray-300 rounded-full py-2 px-3 leading-3
                                                    text-gray-700 focus:outline-none focus:border-blue-500
                                                     focus:ring-blue-500 focus:ring-2 focus:ring-opacity-50"/>


                                                </div>
                                                <div class="flex-none w-14 h-14 ...">
                                                    <button
                                                        onClick={()=>handleIncrement(items._id,items)}
                                                        type="button"
                                                        className="ms-2 rounded-full bg-red-500 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)

                        })
                    }
                </div>

            </main>



            <div className='bg-slate-200 p-4 rounded mt-12 me-5'>


                <a href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
                    <img
                        alt="Home"
                        src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        className="h-56 w-full rounded-md object-cover"
                    />

                    <div className="mt-2">
                        <dl>
                            <div>
                                <dt className="sr-only">Price</dt>

                                <dd className="text-sm text-gray-500">price: $240,000</dd>
                            </div>

                            <div>
                                <dt className="sr-only">Address</dt>

                                <dd className="font-medium">Quantity:3</dd>
                            </div>
                        </dl>

                        <div className="mt-6 flex items-center gap-8 text-xs">





                        </div>
                    </div>
                </a>
            </div>

        </div>
    )
}

export default ListDish
