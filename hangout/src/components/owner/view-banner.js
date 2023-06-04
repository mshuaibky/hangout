import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBanners ,bannerDelete} from '../../helpers/ownerHelper'
import Swal from 'sweetalert2'
import { X } from 'lucide-react'

function ViewBanner() {
    const ownerId = localStorage.getItem('ownerId');
    const [banner, setBanner] = useState([])
    console.log(banner, 'frontBanner');
    useEffect(() => {
        getBanners(ownerId).then((data) => {
            if (data) {
                setBanner(data?.data?.data)
            }
        })
    }, [])
   const handleDelete=async(bannerId,ownerId)=>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async(result) => {
        if (result.isConfirmed) {
            let result=await bannerDelete(bannerId,ownerId)
 
            setBanner(result?.data?.data)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    
   
   }
    return (
        <div className='mx-7'>
            <Link to={'/owner/add-banner'}><button class="mt-5 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                Add Banner
            </button></Link>


            {
                banner.map((items) => {
                    console.log(items,'namma items');
                    return (
                        <div className='p-2 mt-3'>
                            <a
                                style={{ backgroundImage: `url(${items.image})` }}
                                className=" relative block overflow-hidden rounded-xl  bg-cover bg-center bg-no-repeat"
                            >
                                <div className="absolute inset-0 bg-black/25"></div>

                                <div className="relative flex items-start justify-between p-4 sm:p-6 lg:p-8">
                                    <div className="sm:pt-18 pt-12 text-white lg:pt-24">
                                        <h3 className="text-xl font-bold sm:text-2xl">{items.mainDiscription}</h3>

                                        <p className="text-sm">{items.subDiscription}</p>
                                    </div>

                                    <button
                                        onClick={()=>{handleDelete(items._id,ownerId    )}}
                                        type="button"
                                        className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                                    >
                                        <span className="sr-only">Remove</span>
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </a>

                        </div>

                    )
                })
            }
        </div>
    )
}

export default ViewBanner
