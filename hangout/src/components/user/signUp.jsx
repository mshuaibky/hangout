import React,{useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import LoginImage from '../../assets/log.jpg'
import {useFormik} from 'formik'
import toast,{Toaster} from 'react-hot-toast'
import {registerUser,googleLogin} from '../../helpers/userHelpers'
import {getAuth,GoogleAuthProvider,onAuthStateChanged,signInWithPopup}  from 'firebase/auth'
import {app} from '../../config/config'

const validate=values=>{
  const errors = {};

  //username
  if(!values.name){
      errors.name = toast.error('Username Required')
  }else if(values.name.length < 4){
      errors.name = toast.error('username should contain atleast Four characters')
  }


  //email
  else if(!values.email){
      errors.email = toast.error("email is required")
  }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = toast.error("invalid email address")
  }
//password
else if(!values.phone){
  errors.phone = toast.error("Number is required")
}else if(! /^\d{10}$/.test(values.phone)){
  errors.phone = toast.error("invalid Phone Number")
}

  //password
  else if(!values.password){
      errors.password = toast.error('password is required');
  }else if(values.password.length < 6){
      errors.password = toast.error("password should contain atleast Six characters")
  }else if(values.password.includes(' ')){
      errors.password = toast.error('password is required');
  }

  
  return errors
}

function Register() {
  const navigate=useNavigate()
   const formik =useFormik({
   initialValues:{
    name:'',
    email:'',
    phone:'',
    password:''
   },
   validate,
   validateOnBlur:false,
   validateOnChange:false,
   onSubmit:async values=>{
    console.log(values,'namma values');
    let register=registerUser(values)
    toast.promise(register,{
      loading : 'creating...',
      success : <b>sign up successfully</b>,
      error : <b>signup failed</b>
  })
register.then((data)=>{
  console.log(data,'then data');
  if(data){
   navigate('/login')
  }
}).catch(error=>{
  console.log(error,'email error');
  toast.error(error.response.data.msg)
})

   }
   
   })

   //google signUp

  const firebaseAuth=getAuth(app)
  const provider=new GoogleAuthProvider()

  const loginWithGoogle=async()=>{
    const response=await signInWithPopup(firebaseAuth,provider)
    console.log(response,'google response');
    googleLogin(response).then((data)=>{
      if(data){
        navigate('/')
      }
      
    }).catch((error)=>{
      console.log(error.message);
      
    })
  }
  // useEffect(()=>{
  //   firebaseAuth.onAuthStateChanged((userCred)=>{
  //     if(userCred){
  //       userCred.getIdToken().then((token)=>{
  //         console.log(token,'namma token');
  //         googleLogin(token)
  //       })
  //     }
  //   })
  // })

  return (
   <div>
         
         <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            <img
              className="object-cover object-top w-full h-full"
              src={LoginImage}
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

          <div className="relative">
            <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
              <h3 className="text-4xl font-bold text-white">
              Discover and book the best restaurant with Hangout
              </h3>
              <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Commercial License{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Unlimited Exports{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    120+ Coded Blocks{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Design Files Included{" "}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
              Sign Up
            </h2>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <a
                
                title=""
                className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
                
              >
                
               <Link to='/login'>Sign In</Link>
              </a>
            </p>

            <form onSubmit={formik.handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-gray-900 dark:text-gray-200"
                  >
                    {" "}
                    Full Name{" "}
                  </label>
                  <div className="mt-2.5">
                    <input
                      name='name'
                      onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}

                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      type="text"
                      placeholder="Enter You Full Name"
                      id="name"
                    ></input>
                  </div>
                </div>

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
                    htmlFor="email"
                    className="text-base font-medium text-gray-900 dark:text-gray-200"
                  >
                    {" "}
                    Phone Number{" "}
                  </label>
                  <div className="mt-2.5">
                    <input
                      name='phone'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      type="number"
                      placeholder="Enter Your Number"
                      id="phone"
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
                    Get started
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
              <button
                type="button"
                className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 dark:text-gray-400 transition-all duration-200 bg-white border border-gray-500 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
              >
                <div className="absolute inset-y-0 left-0 p-4">
                  <svg
                    className="w-6 h-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </div>
               <button  onClick={loginWithGoogle}> SignUp with google</button>
              </button>
         
            
            </div>
          </div>
        </div>
      </div>
    </section>
   </div>
  )
}

export default Register
