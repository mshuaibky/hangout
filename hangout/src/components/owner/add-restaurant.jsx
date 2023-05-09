import React,{useState,useEffect} from 'react'
import {useFormik} from 'formik'
import toast, {Toaster} from 'react-hot-toast'
import{useNavigate} from 'react-router-dom'
import {resDetails} from '../../helpers/ownerHelper'






const validate=values=>{
  const errors={}


  //username
  if(!values.resName){
    errors.resName = toast.error('name is required')
}else if(values.resName.length < 4){
    errors.resName = toast.error('name should contain atleast Four characters')
}
//resAddress
if(!values.resAddress){
  errors.resAddress = toast.error('Address Required')
}else if(values.resAddress.length < 4){
  errors.resAddress = toast.error('Address should contain atleast Four characters')
}
//number of tables
if(!values.numberOfTables){
  errors.numberOfTables = toast.error('table number is Required')
}
//phone
if(!values.phone){
  errors.phone = toast.error('phone Required')
}else if(values.phone.length<10){
  errors.phone=toast.error('enter valid phone number')
}


return errors

}
function AddRestaurant() {
  const ownerId = localStorage.getItem('ownerId');
console.log(ownerId,'namma ownerId');
  const [image,setImage]=useState('')
  const [error,setError]=useState('')
  const validateFile=(image)=>{
    if (!image) {
      setError("please upload a file");
      return false;
    }
  }
  useEffect(() => {
    if (image !== null) {
      const isValid = validateFile(image);
      if (!isValid) {
        setImage(null);
      }
    }
  }, []);
  const handleResImage=(e)=>{
    const file=e.target.files[0]
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
 
  const navigate=useNavigate()
  const formik=useFormik({
    initialValues:{
      resName:'',
      resAddress:'',
      numberOfTables:'',
      phone:'',
      wifi:false,
      parking:false,
      Ac:false
  
    },
    validate,
   
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async values=>{
     let img={image:image}
    
     console.log(img);    
     let id={ownerId:ownerId}
     const imgCopy=Object.assign({},values,img,id)
     console.log(imgCopy);
   
      let details=resDetails(imgCopy)
      toast.promise(details,{
        loading:'adding...',
        success:<b>successfully added</b>,
        error:<b>failed to add Restaurant</b>
      })
      details.then((data)=>{
        if(data){
          navigate('/owner-home')
        }
      })
    }
  })

  return (
    
    <div className='p-10'>
    <Toaster position='top-center' reverseOrder={false} ></Toaster>
      

        <form onSubmit={formik.handleSubmit} className="mx-auto max-w-lg">
      <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
        Restaurant Name
      </label>
      <input
      name='resName'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.resName}
        className="w-full border border-gray-400 p-2 rounded-md mb-4"
        type="text"
        id="name"
      
      />
     
   
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
       Address
      </label>
      <input
      name='resAddress'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.resAddress}
        className="w-full border border-gray-400 p-2 rounded-md mb-4"
        type="text"
        id="name"
    
      
      />
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
     Number Of Tables
      </label>
      <input
         name='numberOfTables'
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.numberOfTables}
        className="w-full border border-gray-400 p-2 rounded-md mb-4"
        type="number"
        id="name"
     
      
      />
      
<h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Fecilities</h3>
<ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div className="flex items-center pl-3">
            <input 
            name='wifi'
            onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.wifi}
             id="vue-checkbox-list" type="checkbox"  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label for="vue-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Wifi</label>
        </div>
    </li>
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div className="flex items-center pl-3">
            <input name='parking'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.parking}
             id="react-checkbox-list" type="checkbox"  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label for="react-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">parking</label>
        </div>
    </li>
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div className="flex items-center pl-3">
            <input name='Ac' 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Ac}
            id="angular-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label for="angular-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">AirConditioning</label>
        </div>
  </li>
</ul>

        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
       Phone
      </label>
      <input
      name='phone'
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       value={formik.values.phone}
        className="w-full border border-gray-400 p-2 rounded-md mb-4"
        type="text"
        id="name"
     
      
      />

<div className='py-5'>
<input 
onChange={handleResImage}
id="file" name="resImages" type="file"
className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
  {image==null ? <p style={{color:'red'}}>{error}</p>:""}
    {image?
<img className='py-4' width="200px" height="200px" src={image }></img>:""}
</div>

<div className='space-x-5'>


      <button className= " bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" type="submit">
      Submit
      </button>
    
      <button 
      type='submit'
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" >
      
      Back
      </button>
      
</div>
      
    </form>
    </div>
  )
}

export default AddRestaurant
