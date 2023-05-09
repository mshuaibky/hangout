import React from 'react'
import {useFormik} from 'formik'
import {useNavigate} from 'react-router-dom'

import toast,{Toaster} from 'react-hot-toast'
import {verify} from '../../helpers/userHelpers'

function Verify() {
  const navigate=useNavigate()
    const formik=useFormik({
        initialValues:{
            otp:'',
       
        },
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values=>{
            const validateOtp=verify(values)
            toast.promise(validateOtp,{
                loading:'loaging in...',
                success:<b>loggin success </b>,
                error:<b>something went wrong </b>
        
            })
            validateOtp.then((data)=>{
              if(data){
                navigate('/')
              }
            })
        }
    })
  return (
    <div>
       <div className="flex items-center justify-center">
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
          Login With Otp
          </h2>
         

          <form onSubmit={formik.handleSubmit} className="mt-8">
            <div className="space-y-5">
            

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900 dark:text-gray-200"
                  >
                    {' '}
                    Enter phone Number{' '}
                  </label>

                 
                </div>
                <div className="mt-2.5">
                  <input
                  name='otp'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.otp}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="number"
                    placeholder="six numbers"
                  ></input>
                </div>
              </div>

              <div>
                <button
               
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                >
                  Get started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="ml-2 h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>

          <div className="mt-3 space-y-3">
            

           
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Verify
