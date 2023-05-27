import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import {paymentDetails} from '../../helpers/userHelpers'


function Payment() {

 const navigate=useNavigate()
  let sum = 0
  const data = sessionStorage.getItem('orderDetails');
  const orders = JSON.parse(data)
  console.log(orders,'parsed order');
  const user = localStorage.getItem('persist:1');
  const parsedData = JSON.parse(user);

  const users = JSON.parse(parsedData.user).user.user;


  const owner = localStorage.getItem('ownerId');
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  let userId={userId:users}
  let ownerId={ownerId:owner}
  let id={id:orders._id}
  let datas=Object.assign({},userId,ownerId,id)

  function payment(datas){
   paymentDetails(datas).then((result)=>{
  if(result){
    navigate('/orders')
  }
   }).catch((error)=>{
    toast.error('somthing went wrong please book once more')
   })
   }


  const handlePay = (e) => {
    e.preventDefault();
    if (!sum) {
      alert('please enter specify the total amount')
    } else if (!name) {
      toast.error('name is required')
    } else if (!email) {
      toast.error('email is required')
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      toast.error("invalid email address")
    } else if (!phone) {
      toast.error('phone No is required')
    } else if (! /^\d{10}$/.test(phone)) {
      toast.error("invalid Phone Number")
    }
    else {
      let options = {
        key: "rzp_test_eqb8SYp1lZbRoB",
        key_secret: "ejAz4hgCoAR2urbdQrypLxvm",
        amount: sum * 100,
        currency: "INR",
        name: "Hangout ",
        description: "payment ",
        handler: function (response,error) {
          console.log(response,'razorpay resoponse');
         if(response){
          payment(datas)
         
         }else{
          console.log(error,'error inda');
         }
        },
        prefill: {
          name: {name},
          email: {email},
          contact: {phone}
        },
        notes: {
          address: "Razorpay Corporate office"
        },
        theme: {
          color: "#3399cc"
        }
      }
      var pay = new window.Razorpay(options);
    
      pay.open(
      
      );
   
    }
  }

  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <section>
        <h1 className="sr-only">Checkout</h1>

        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-50 py-12 md:py-24">
            <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
              <div className="flex items-center gap-4">

                <h2 className="font-medium text-gray-900">Enjoy Your {orders.orderType}</h2>

              </div>
              <h2 className="font-medium text-gray-900">reserved Table No:{orders.tableNo}</h2>
              {/* 
        <div>
          <p className="text-2xl font-medium tracking-tight text-gray-900">
            $99.99
          </p>

          <p className="mt-1 text-sm text-gray-600">lll</p>
        </div> */}

              <div>

                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-100">
                    {

                      orders.orderDetails.map((items) => {
                        sum += items.total;

                        return (

                          <li className="flex items-center gap-4 py-4">
                            {
                              items.image.map((image) => {
                                return (
                                  <img
                                    src={image.secure_url}
                                    alt=""
                                    className="h-16 w-16 rounded object-cover"
                                  />)
                              })
                            }

                            <div>
                              <h3 className="text-sm text-gray-900">Dish:{items.name}</h3>

                              <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                <div>
                                  <dt className="inline">quantity:</dt>
                                  <dd className="inline">{items.count}</dd>
                                </div>

                                <div>
                                  <dt className="inline">price:</dt>
                                  <dd className="inline">{items.total}</dd>
                                </div>
                              </dl>
                            </div>
                          </li>)
                      })
                    }

                  </ul>
                </div>

              </div>
              <div >
                <p className=" text-green-600 text-lg font-bold">Total Amount RS:{sum}</p>
              </div>



            </div>
          </div>

          <div className="bg-white py-12 md:py-24">
            <div className="mx-auto max-w-lg px-4 lg:px-8">
              <form className="grid grid-cols-6 gap-4">
                <div className="col-span-6">
                  <label
                  
                    className="block text-xs font-medium text-gray-700"
                  >
                    Full Name
                  </label>

                  <input
                    name='name'
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    type="text"
                    id="name"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>


                <div className="col-span-6">
                  <label  className="block text-xs font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    name='email'
                    value={email}
                    onChange={(e) => {setEmail( e.target.value) }}
                    type="email"
                    id="email"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="Phone" className="block text-xs font-medium text-gray-700">
                    Phone
                  </label>

                  <input
                    name='phone'
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value) }}
                    type="tel"
                    id="Phone"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>
                <div className="col-span-6">
                  <label htmlFor="Phone" className="block text-xs font-medium text-gray-700">
                    Total amount
                  </label>

                  <input
                    value={sum}

                    type="text"
                    id="total amount"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>





                <div className="col-span-6">
                  <button
                    onClick={handlePay}
                    className="block w-full rounded-md bg-green-500 p-2.5 text-sm text-white transition hover:shadow-lg"
                  >
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Payment
