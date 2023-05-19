import React,{useState,useEffect} from 'react'
import Image from '../../assets/hotel.png'
import {useFormik} from 'formik'
import toast, {Toaster} from 'react-hot-toast'
import{useNavigate,Link} from 'react-router-dom'
import {properDetails} from '../../helpers/ownerHelper'



function OwnerDetails() {
    const [image,setImage]=useState('')
 
    const validate=values=>{
       
        const errors={}
        
     //username
     if(!values.Name){
        errors.Name = toast.error('name is required')
    }else if(values.Name.length < 4){
        errors.Name = toast.error('name should contain atleast Four characters')
    }
    else if(!values.email){
        errors.email = toast.error("email is required")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = toast.error("invalid email address")
    }
    //fssai
    else if(!values.code){
        errors.code=toast.error('fssai code is required')
      }
      else if(! /^\d{14}$/.test(values.code)){
        errors.code = toast.error("invalid Fssai Number")
      }
    
    //phone
    if(!values.phone){
      errors.phone = toast.error('phone Required')
    }else if(! /^\d{10}$/.test(values.phone)){
        errors.phone = toast.error("invalid Phone Number")
      }
    
      else if (!image) {
        errors.image = toast.error("image is required")
    }
        return errors
    }
  
      const handleResImage=(e)=>{
        console.log(e,'eeee');
        const file=e.target.files[0]
        if(!file){
            console.log('ddd');
            toast.error('please upload a file')
        }
        TransformFile(file)
      };
      const TransformFile=(file)=>{
        const reader=new FileReader()
        if(file){
          reader.readAsDataURL(file);
          reader.onloadend=()=>{
            setImage(reader.result)
          }
        }else{
          setImage("")
        }
      }
      let result;
      if (image) {
          
          const delimiter = '/';
          const end = ';'
          const index = image.indexOf(delimiter);
          const endIndex = image.indexOf(end);
          result = image.slice(index + 1,endIndex);
  
      }
console.log(result,'dddd');  
      const navigate=useNavigate()
    const formik=useFormik({
        initialValues:{
          Name:'',
          email:'',
          code:'',
         phone:'',
        
      
        },
        validate,
       
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values=>{
            console.log(values,'owner values');
         let img={image:image}

         const imgCopy=Object.assign({},values,img)
         console.log(imgCopy);
       
          let details=properDetails(imgCopy)
          toast.promise(details,{
            loading:'adding...',
            success:<b>successfully added</b>,
            error:<b>failed to add Restaurant</b>
          })
          details.then((data)=>{
            if(data){
              navigate('/owner-login')
            }
          })
        }
      })
    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2">
        <Toaster position='top-center' reverseOrder={false}></Toaster>

                <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
                    <div className="absolute inset-0">
                        <img
                            className="h-full w-full object-cover object-top"
                            src={Image}
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                    <div className="relative">
                        <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
                            <h3 className="text-4xl font-bold text-white">
                               Please Enter Your Restaurant Details For Your Better Experiance!
                            </h3>
                            <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                        <svg
                                            className="h-3.5 w-3.5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white"> Commercial License </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                        <svg
                                            className="h-3.5 w-3.5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white"> Unlimited Exports </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                        <svg
                                            className="h-3.5 w-3.5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white"> 120+ Coded Blocks </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                        <svg
                                            className="h-3.5 w-3.5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white"> Design Files Included </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                            Enter your Hotel Details
                        </h2>
                        <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                            Already have an Account?{' '}

                            <Link to={'/owner-login'}
                                href="#"
                                title=""
                                className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
                            >
                               Login 
                            </Link>
                            
                        </p>

                        <form onSubmit={formik.handleSubmit}  className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="text-base font-medium text-gray-900 dark:text-gray-200"
                                    >
                                        {' '}
                                         Name{' '}
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                         name='Name'
                                         onChange={formik.handleChange}
                                         onBlur={formik.handleBlur}
                                         value={formik.values.Name}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="text"
                                            placeholder="Enter You Full Name"
                                            id="name"
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="text-base font-medium text-gray-900 dark:text-gray-200"
                                    >
                                        {' '}
                                         Email{' '}
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                         name='email'
                                         onChange={formik.handleChange}
                                         onBlur={formik.handleBlur}
                                         value={formik.values.email}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="email"
                                            placeholder="Enter You Full Name"
                                            id="email"
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="code"
                                        className="text-base font-medium text-gray-900 dark:text-gray-200"
                                    >
                                        {' '}
                                        Fssai Code{' '}
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                         name='code'
                                         onChange={formik.handleChange}
                                         onBlur={formik.handleBlur}
                                         value={formik.values.code}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="text"
                                            placeholder="Enter fourteen dijit code"
                                            id="code"
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="code"
                                        className="text-base font-medium text-gray-900 dark:text-gray-200"
                                    >
                                        {' '}
                                        Number{' '}
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                         name='phone'
                                         onChange={formik.handleChange}
                                         onBlur={formik.handleBlur}
                                         value={formik.values.phone}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="text"
                                            placeholder="Enter Your Number"
                                            id="Phone"
                                        ></input>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="text-base font-medium text-gray-900 dark:text-gray-200"
                                    >
                                        {' '}
                                        Upload Licence{' '}
                                    </label>
                                    <div className="mt-2.5">
                                        <div className='py-5'>
                                            <input
                                                onChange={handleResImage}

                                                id="file" name="resImages" type="file"
                                                className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
                                             {image?
                                             
                                             <img className='py-4' width="200px" height="200px" src={image}></img>:""
                                            }
                                               
                                        </div>
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


                    </div>
                </div>
            </div>
        </section>

    )
}

export default OwnerDetails
