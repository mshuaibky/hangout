import React, { useEffect, useState } from 'react'
import { orderDetails, getUser, userpaginatedOrder } from '../../helpers/userHelpers'

function Orders() {
   


    const user = localStorage.getItem('persist:1');
    const parsedData = JSON.parse(user);
    const userId = JSON.parse(parsedData.user).user.user;

    const [order, setOrder] = useState([])
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    console.log(order.updatedAt,'...');
  


    useEffect(() => {
        // orderDetails(userId).then((data)=>{
        //     if(data){
        //         console.log(data,'response');
        //         setOrder(data?.data?.data)
        //     }
        // })
        userpaginatedOrder(page, userId).then((data) => {
            console.log(data, 'paginated data');
            setOrder(data?.data?.data)
            if (data) {
                setPageCount(data?.data?.pageCount)
            }
        })
    }, [page])
    useState(() => {
        getUser(userId).then((result) => {
            if (result) {
                setUsers(result?.data?.data)
            }
        })
    }, [])

    const handlePrev = () => {

        setPage((p) => {
            if (p === 1) return p
            return p - 1
        })
    }
    const handleNext = () => {

        setPage((p) => {

            if (p === pageCount) return p
            return p + 1
        })
    }
    let sum = 0
    return (
        <div>
            {
                order?.map((items) => {
                    const timestamp =items.updatedAt
                    const date = new Date(timestamp);
                    
                    // Extracting date components
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1
                    const day = date.getDate();
                    
                    // Extracting time components
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    const seconds = date.getSeconds();
                    console.log(hours,'hours',minutes,'min',seconds,'sec');
                    return (
                        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                            <div className="flex justify-start item-start space-y-2 flex-col ">
                                <p className=" lg:text-xl font-semibold leading-7 lg:leading-9  text-gray-800">Date:{year?year:""}-{month?month:""}-{day?day:''}</p>
                                <p className="text-base font-medium leading-6 text-gray-600">Time:{hours?hours:''}:{minutes?minutes:''}:{seconds?seconds:""}</p>
                            </div>
                            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Table NO:{items.tableNo}</p>

                                        {

                                            items?.orderDetails?.map((data) => {
                                                sum += data.price

                                                return (
                                                    <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                                                        <div className="pb-4 md:pb-8 w-full md:w-40">
                                                            {
                                                                data?.image?.map((image) => {
                                                                    return (
                                                                        <img className="w-full hidden md:block" src={image.secure_url} alt="dress" />)
                                                                })
                                                            }


                                                        </div>

                                                        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                                <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{data.name}</h3>
                                                                <div className="flex justify-start items-start flex-col space-y-2">
                                                                    <p className="text-sm leading-none text-gray-800">
                                                                        <span className="text-gray-300">catagory: </span>{data.catagory}
                                                                    </p>
                                                                    <p className="text-sm leading-none text-gray-800">
                                                                        <span className="text-gray-300">price: </span> {data.price}
                                                                    </p>

                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between space-x-8 items-start w-full">
                                                                <p className="text-base xl:text-lg leading-6">
                                                                    <span className="text-red-500 ">price :{data.price}</span>
                                                                </p>
                                                                <p className="text-base xl:text-lg leading-6 text-gray-800">{data.count}</p>
                                                                <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">{items.orderType}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                                            <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                                <div className="flex justify-between  w-full">
                                                    <p className="text-base leading-4 text-gray-800">Subtotal</p>
                                                    <p className="text-base leading-4 text-gray-600">$56.00</p>
                                                </div>
                                                <div className="flex justify-between items-center w-full">
                                                    <p className="text-base leading-4 text-gray-800">
                                                        Discount <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">STUDENT</span>
                                                    </p>
                                                    <p className="text-base leading-4 text-gray-600">-$28.00 (50%)</p>
                                                </div>

                                            </div>
                                            <div className="flex justify-between items-center w-full">
                                                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                                <p className="text-base font-semibold leading-4 text-gray-600">RS:{sum}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                                {/* <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
                    <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                            <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                                <div className=" flex justify-start items-start flex-col space-y-2">
                                    <p className="text-base font-semibold leading-4 text-left text-gray-800">{users.name}</p>
                                 
                                </div>
                            </div>

                            <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="cursor-pointer text-sm leading-5 text-gray-800">{users.email}</p>
                            </div>
                        </div>
                        <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{}</p>
                                </div>
                              
                            </div>
                           
                        </div>
                    </div>
                </div> */}

                            </div>
                        </div>
                    )
                })
            }

            {/* pagination */}


            <div class="flex flex-col items-center ">


                <div class="inline-flex mt-2 xs:mt-0">
                    <button
                        disabled={page === 1}
                        onClick={handlePrev}

                        class="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Prev
                    </button>
                    <button
                        disabled={page === pageCount}
                        onClick={handleNext}
                        class="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Next
                    </button>
                </div>
            </div>
            {/* end */}

            <footer class="relative bg-blueGray-200 pt-10 pb-6 bg-slate-200 mt-4">
                <div class="container mx-auto px-4">
                    <div class="flex flex-wrap text-left lg:text-left">
                        <div class="w-full lg:w-6/12 px-4">
                            <h4 class="text-3xl fonat-semibold text-blueGray-700">Let's keep in touch!</h4>
                            <h5 class="text-lg mt-0 mb-2 text-blueGray-600">
                                Find the best Restautants in Kochi
                            </h5>
                            <div class="mt-6 lg:mb-0 mb-6">
                                <button class="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i class="fab fa-twitter"></i></button><button class="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i class="fab fa-facebook-square"></i></button><button class="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i class="fab fa-dribbble"></i></button><button class="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i class="fab fa-github"></i>
                                </button>
                            </div>
                        </div>
                        <div class="w-full lg:w-6/12 px-4">
                            <div class="flex flex-wrap items-top mb-6">
                                <div class="w-full lg:w-4/12 px-4 ml-auto">
                                    <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Useful Links</span>
                                    <ul class="list-unstyled">
                                        <li>
                                            <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="">About Us</a>
                                        </li>
                                        <li>
                                            <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="">Blog</a>
                                        </li>
                                        <li>
                                            <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="">Restaurants</a>
                                        </li>
                                        <li>
                                            <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="">Cafe</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="w-full lg:w-4/12 px-4">
                                    <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Other Resources</span>
                                    <ul class="list-unstyled">
                                        <li>
                                            <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile">MIT License</a>
                                        </li>
                                        <li>
                                            <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/terms?ref=njs-profile">Terms &amp; Conditions</a>
                                        </li>
                                        <li>
                                            <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/privacy?ref=njs-profile">Privacy Policy</a>
                                        </li>
                                        <li>
                                            <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/contact-us?ref=njs-profile">Contact Us</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="my-6 border-blueGray-300"/>
                        <div class="flex flex-wrap items-center md:justify-between justify-center">
                            <div class="w-full md:w-4/12 px-4 mx-auto text-center">
                                <div class="text-sm text-blueGray-500 font-semibold py-1">
                                    Copyright © <span id="get-current-year">2023</span>
                                        <p  class="text-blueGray-500 hover:text-blueGray-800">Hangout</p>.
                                </div>
                            </div>
                        </div>
                </div>
            </footer>
        </div>
    )
}

export default Orders
