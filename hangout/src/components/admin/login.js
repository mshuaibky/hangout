import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useFormik } from 'formik'
import {adminLogin} from '../../helpers/adminHelpers'
import toast,{Toaster} from 'react-hot-toast'

const validate=values=>{
    let errors={}

    return errors
}
function AdminLogin() {
    const navigate=useNavigate()
const formik=useFormik({
    initialValues:{
        email:'',
        password:""
    },
    validate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async values=>{
        let details=adminLogin(values)
        toast.promise(details,{
            loading:'loading...',
            success:<b>created succesfully</b>,
            error:<b>login failed</b>
        })
details.then((data)=>{
    if(data){
        navigate('/admin/owner-list')
    }
}).catch((error)=>{
    console.log(error,'namma error');
})
    }
})
  return (
    <div>
   
<div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" >
  <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
    <div className="text-white">
      <div className="mb-8 flex flex-col items-center">
        <img src=''/>
        <h1 className="mb-2 text-2xl">Hangout</h1>
        <span className="text-gray-300">Enter signUP Details</span>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4 text-lg">
          <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="email"
           name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
            placeholder="email" />
        </div>

        <div className="mb-4 text-lg">
          <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="Password"
           name="password"
           onBlur={formik.handleBlur}
           onChange={formik.handleChange}
           value={formik.values.password}
           placeholder="password" />
        </div>
        <div className="mt-8 flex justify-center text-lg text-black">
          <button type="submit" className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
</div>
  )
}

export default AdminLogin
