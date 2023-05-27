import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom';
import { dishDetails } from '../../helpers/userHelpers'
import { Plus, Minus } from 'lucide-react'


function ListDish() {


    const { id } = useParams();
    const [state, setState] = useState(false);
    const [dishData, setDishData] = useState([]);
  
    useEffect(() => {
      const storedDishData = sessionStorage.getItem('dishData');
  
      if (storedDishData) {
        setDishData(JSON.parse(storedDishData));
      } else {
        dishDetails(id).then((dishDetails) => {
          const updatedDishData = dishDetails.data.data.map((item) => ({
            ...item,
            count: 0,
            total: 0,
          }));
          setDishData(updatedDishData);
  
          sessionStorage.setItem('dishData', JSON.stringify(updatedDishData));
        });
      }
    }, [id]);
  
    const handleIncrement = (itemId) => {
      const updatedDishData = dishData.map((item) => {
        if (item._id === itemId) {
          const updatedItem = {
            ...item,
            count: item.count + 1,
            total: (item.count + 1) * item.price, // Calculate the new total
          };
          sessionStorage.setItem(itemId, JSON.stringify(updatedItem));
          return updatedItem;
        }
        return item;
      });
      setDishData(updatedDishData);
      setState(true);
      sessionStorage.setItem('dishData', JSON.stringify(updatedDishData));
    };
  
    const handleDecrement = (itemId) => {
      const updatedDishData = dishData.map((item) => {
        if (item._id === itemId) {
          const newCount = item.count - 1;
          const updatedItem = {
            ...item,
            count: newCount >= 0 ? newCount : 0,
            total: (newCount >= 0 ? newCount : 0) * item.price, // Calculate the new total
          };
          sessionStorage.setItem(itemId, JSON.stringify(updatedItem));
          return updatedItem;
        }
        return item;
      });
      setDishData(updatedDishData);
      sessionStorage.setItem('dishData', JSON.stringify(updatedDishData));
    };
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
         console.log(items,'namm aitmms');
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
                                                    catagory : {items.catagory}
                                                </div>
                                                <div class="text-lg text-red-500 font-bold">
                                                    RS:{items.price}
                                                </div>
                                            </div>
                                            <div class=" mt-4 flex ">
                                                <div class="flex-none w-14 h-14 ...">

                                                    <button

                                                        onClick={() => { handleDecrement(items._id) }}
                                                        type="button"
                                                        className=" rounded-full bg-red-500 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>


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
                                                        onClick={() => handleIncrement(items._id)}
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


            <article className="rounded-lg border w-96 bg-gray-200  mt-10 me-6 p-4">
                {
                    dishData.map((dishes) => {
                     
                        return (
                            
                            <div className="flex items-center justify-between mt-5 ">

                                {
                                    dishes.count ?
                                        <div>
                                            <p className="text-xl text-gray-500">{dishes.name}</p>
                                            <p className="text-base text-black-400">quantity:{dishes.count}</p>
                                            <p className="text-lg font-medium text-gray-900 mt-2">Total:{dishes.count * dishes.price}</p>
                                        </div> : ""
                                }
                                {
                                    dishes.count ?
                                        <span className="rounded-md p-4 text-blue-600">
                                            {
                                                dishes.image.map((image) => {
                                                    return (
                                                        <img className='object-cover  rounded-lg w-24 h-24' src={image.secure_url} alt="" />)
                                                })
                                            }
                                        </span> : ""
                                }



                            </div>
                        )

                    })
                }

            {
                state&&
            <div className='text-center mt-5'>
                    <Link to={'/user/checkout'}
                        type="button"
                        class="w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        Next
                    </Link>
                </div>
            }
            </article>

        </div>
    )
}

export default ListDish