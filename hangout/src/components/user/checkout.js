import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Image from '../../assets/hotel.png'
import { getTableData, checkoutData, bookedOrders } from '../../helpers/userHelpers'
import { getResDetais } from '../../helpers/ownerHelper'
import DatePicker from "react-horizontal-datepicker"

function Checkout() {
  const currentDate=new Date()
  console.log(currentDate,'currentDate');
  const user = localStorage.getItem('persist:1');
  const parsedData = JSON.parse(user);
  const userId = JSON.parse(parsedData.user).user.user;


  const ownerId = localStorage.getItem('ownerId');
  const dishData = sessionStorage.getItem('dishData');
  const allDishData = JSON.parse(dishData);
  const [button, setButton] = useState('')
  console.log(button, 'table');
  const [selectedValue, setSelectedValue] = useState('')
  const [table, setTable] = useState([])
  console.log(table,'tables');
  const [res, setRes] = useState([])
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [newData,setNewData]=useState([])
  console.log(newData,'newData');
  console.log(date, 'date');
  console.log(time, 'table time');
  // date
  const startTime = res[0]?.startTime
  const endTime = res[0]?.endTime;


  const startDate = new Date(`01/01/2000 ${startTime}`);
  const endDate = new Date(`01/01/2000 ${endTime}`);

  const timeList = [];

  let currentTime = startDate;

  while (currentTime <= endDate) {
    // Get the current hour and minutes
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;


    timeList.push(formattedTime);


    currentTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
  }
  console.log(timeList, 'time List');
  //end date
  const navigate = useNavigate()
  useEffect(() => {
    getTableData(ownerId).then((data) => {

      setTable(data?.data?.data)
    })
  }, [])

  const handleTime = (e) => {
    const value = e.target.value
    setTime(value)
  }
  const handleClick = (e) => {
    const value = e.target.value

    setButton(value)
  }

  const handlePayment = () => {
    const allData = { allDishData, button, selectedValue, userId, date, time }
    checkoutData(allData).then((data) => {
      if (data) {
        console.log(data, 'nammada data');
        const order = data.data.data
        sessionStorage.setItem('orderDetails', JSON.stringify(order));
        navigate('/payment')
      }
    })


  }
  useState(() => {
    getResDetais(ownerId).then((data) => {

      setRes(data?.data?.data)
    })
  })

  const selectedDay = (val) => {
    const startDate = new Date(val);
    const startDateString = startDate.toLocaleDateString();
    setDate(startDateString)
  };
  useEffect(() => {
    bookedOrders(userId,date,time).then((data) => {
      console.log(data, 'data booked orders');
      setNewData(data?.data?.data)
    })
  }, [date,time])
  
  const tableNumbers = newData?.map(obj => obj.tableNo);
  console.log(tableNumbers,';;;;');


  const filteredData = table?.filter(obj => !tableNumbers?.includes(obj.number));
console.log(filteredData,'filteredTables');
  return (
    <div class="h-screen w-full flex bg-white-800 ">


      <main class="w-full overflow-y-auto">

        <div className="carousel  mt-6 p-2 ">
          <div id="slide1" className="carousel-item relative w-full">
            <img className='h-96 w-full object-cover rounded-md' src={Image} />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle">❮</a>
              <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
          </div>


        </div>

        {/* restaurant details */}
        <a
          className="me-2 mx-2 block rounded-xl  bg-white-900 p-2 border-slate-400 shadow-xl sm:p-6 lg:p-8"
          href=""
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>

          <h3 className="mt-3 text-lg font-bold text-black sm:text-xl">
            hotel Name
          </h3>

          <p className="mt-4 text-sm text-black-300">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio eius labore
            nisi tempore modi vel voluptate ullam nostrum adipisci suscipit eaque quae
            cupiditate, accusamus minus laboriosam totam laborum, deserunt sint.
          </p>
        </a>



        {/* ending restaurant details */}
    
    {/* review component */}

      </main>


      <article className="rounded-lg border w-96  bg-gray-200  m-6 me-6 p-4 ">
        <p className=' text-center text-lg'>Book Table</p>

        <div className="  bg-white rounded-md  mt-5 h-full">

        





          <h5 className='mt-5 text-center text-slate-600'>choose an available time slot </h5>

          <div className='p-2'>

            <select
              value={selectedValue}
              onChange={(e) => { setSelectedValue(e.target.value) }}
              id="countries" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Choose Your Time</option>
              <option

                value='breakfast'>BreakFast</option>
              <option

                value="Lunch">Lunch</option>
              <option

                value="Dinner">Dinner</option>

            </select>

          </div>

          {/* datePicker */}
          <div className='mx-3'>

            <DatePicker
              getSelectedDay={selectedDay}
              endDate={31}
              selectDate={currentDate}
              labelFormat={"MMMM"}
              color={"#16a34a"}
            />
          </div>
          {/* datePicker end */}

          {/* select time */}
          <div class=" grid grid-cols-6 gap-x-20 gap-y-3  overflow-auto mx-4">
            {
              timeList.map((items) => {
                return (
                  <div className=' '>
                    <button
                      value={items}
                      onClick={handleTime}
                      type="button"
                      className="w-16 me-5 rounded-md bg-green-700  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      {items}
                    </button>
                  </div>

                )
              })
            }
          </div>
          {/* end select time */}

 <h5 className='mt-5 text-center text-slate-600'>available Tables </h5>
 {
            button ?
              <div class="grid grid-cols-3 gap-3 m-5 pt-4">
                {
                  filteredData?.map((data) => {
                    console.log(data, 'data');
                    return (
                      <div>
                        <button
                          disabled
                          onClick={handleClick}
                          value={data.number}
                          type="button"
                          class="rounded-md bg-green-600 hover:text-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                          Table  {data.number}
                        </button>
                      </div>)

                  })
                }
              </div> :
              <div class="grid grid-cols-4 gap-2 m-5 pt-4">
                {
                  filteredData?.map((data) => {
                    return (
                      <div>
                        <button

                          onClick={handleClick}
                          value={data.number}
                          type="button"
                          class="rounded-md bg-green-600 hover:text-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                          Table  {data.number}
                        </button>
                      </div>)

                  })
                }
              </div>
          } 

          <div className='text-center m-3'>
            <Link
              onClick={handlePayment}
              type="button"
              class="w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              proceed payment
            </Link>
          </div>
        </div>


      </article>


    </div>
  )
}

export default Checkout
