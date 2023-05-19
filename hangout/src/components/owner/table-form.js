import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {Home} from 'lucide-react'
import {useFormik} from 'formik'
import toast, {Toaster} from 'react-hot-toast'
import {tableDetails} from '../../helpers/ownerHelper'

function TableForm() {
    const ownerId = localStorage.getItem('ownerId');
    console.log(ownerId,'ownerid');
    const navigate=useNavigate()
    const validate=values=>{
        const error={}

        return error
    }
    const formik=useFormik({
        initialValues:{
            number:''
        },
        validate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values=>{
           const id={ownerId:ownerId}
           const data=Object.assign({},values,id)
           console.log(data,'ellam data');
           console.log('dkdjd');
            let details=tableDetails(data)
            toast.promise(details,{
                loading:'adding...',
                success:<b>added successfully</b>,
                error:<b>failed to add dish</b>
            })
            details.then((data)=>{
                if(data){
                    navigate('/owner/add-table')
                }
            })
        }
    })
    return (
        <div>
            <div>
                <nav className="m-3 flex  min-w-fit items-start rounded-md bg-gray-100 p-2" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link to={'/owner/add-table'}
                                href="#"
                                className="ml-1 inline-flex text-sm font-medium text-gray-800 hover:underline md:ml-2"
                            >
                                <Home className="mr-4 h-4 w-4" />
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="mx-2.5 text-gray-800 ">/</span>
                                <Link to={'/owner/add-table'}
                                    href="#" className="ml-1 text-sm font-medium text-gray-800 hover:underline md:ml-2">
                                    Tables
                                </Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <span className="mx-2.5 text-gray-800 ">/</span>
                                <span className="ml-1 text-sm font-medium text-gray-800 hover:underline md:ml-2">
                                    Add Table
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>


                <div className='rounded-md shadow-md  bg-slate-200   border-gray-700  p-3 m-4'>
                    <Toaster position='top-center' reverseOrder={false}></Toaster>


                    <form onSubmit={formik.handleSubmit} className="mx-auto max-w-lg">
                        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
                            Table Number
                        </label>
                        <input
                            name='number'
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.number}
                            className="w-full border border-gray-400 p-2 rounded-md mb-4"
                            type="text"
                            id="number"
                            placeholder='table number'

                        />


                       

                        <div className='space-x-5'>


                            <button className=" bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" type="submit">
                                Submit
                            </button>

                           

                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default TableForm
