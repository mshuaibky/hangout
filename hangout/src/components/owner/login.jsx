import React from 'react'
import {useFormik} from 'formik'
import restLogo from '../../assets/restLogo.png'
import {OwnerLogin} from '../../helpers/ownerHelper'
import{useNavigate,Link} from 'react-router-dom'
import toast,{Toaster} from 'react-hot-toast'



const validate=values=>{

  const errors = {};

 

  //email
 if(!values.email){
      errors.email = toast.error("email is required")
  }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = toast.error("invalid email address")
  }


  //password
  else if(!values.password){
      errors.password = toast.error('password is required');
  }else if(values.password.length < 6){
      errors.password = toast.error("password should contain atleast Six characters")
  }else if(values.password.includes(' ')){
      errors.password = toast.error('wrong password');
  }

  
  return errors

}
function Login() {
  const navigate=useNavigate()
  const formik=useFormik({
   initialValues:{
    email:'',
   
    password:''
   },
   validate,
   validateOnBlur:false,
   validateOnChange:false,
   onSubmit:async values=>{
  let details= OwnerLogin(values)
  toast.promise(details,{
    loading:'logging In',
    success:<b>created succesfully</b>,
    error:<b>login failed</b>
  })
  details.then((data)=>{
   
    
    if(data){
      navigate('/owner-home')
    }
  }).catch((error)=>{
 
    toast.error(error.response.data.msg)
  console.log(error);
  })
   }
  })
 
  return (
    <section>
    <div className="grid grid-cols-1 lg:grid-cols-2">
    <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
          <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
       Login
          </h2>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
           Dont Register yet?{" "}
            <a
              href="#"
              title=""
              className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
            >
              <Link to='/sign-up'>SignUp</Link>
            </a>
          </p>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
           Not  Register your Restaurant in HANGOUT?{" "}
            <a
              href="#"
              title=""
              className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
            >
              <Link to='/owner/more-details'>Register</Link>
            </a>
          </p>

          <form onSubmit={formik.handleSubmit} className="mt-8">
            <div className="space-y-5">
              

              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900 dark:text-gray-200"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2.5">
                  <input
                    name='email'
                    onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="email"
                    placeholder="Enter Your Email"
                    id="email"
                  ></input>
                </div>
              </div>
              

              <div>
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900 dark:text-gray-200"
                >
                  {" "}
                  Password{" "}
                </label>
                <div className="mt-2.5">
                  <input
                    name='password'
                    onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="password"
                    placeholder="Enter Your Password"
                    id="password"
                  ></input>
                </div>
              </div>

              <div>
                <button type='submit' className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">
                  Login
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 ml-2"
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
          

         
            <p>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Read our{" "}
                <span className="capitalize text-indigo-600">
                  privacy policy
                </span>{" "}
                and{" "}
                <span className="capitalize text-indigo-600">
                  terms of service
                </span>{" "}
                to learn more
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-full">
        <img
          className="w-full h-full mx-auto object-cover"
          src={restLogo}
          alt=""
        />
      </div>
    </div>
  </section>
  )
}

export default Login
