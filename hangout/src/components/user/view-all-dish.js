import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllRestaurnts,getPaginatedRes,getallDishes } from '../../helpers/userHelpers'
import Image from '../../assets/hotel.png'

function ViewAllDish() {
    useEffect(() => {
        sessionStorage.clear();
    }, [])

    const [dish, setDish] = useState([])
    const [res, setRes] = useState([])
   
const result = res.map((resItem, index) => {
    const dishItem = dish[index]; // Get the corresponding dish detail
  
 
    const mergedItem = {
      ...resItem,
      dishDetails: dishItem,
    };
  
    return mergedItem;
  });
  console.log(result);

    useEffect(() => {
        getAllRestaurnts().then((result) => {
            setRes(result?.data?.data)
            getallDishes().then((data)=>{
                if(data){
                    setDish(data?.data?.data)
                }
            })
        })
    }, [])

        return (

            <div >
              
                <div className='grid grid-cols-4 gap-4 p-10'>
{
    result?.map((data)=>{
        console.log(data,'dishData');
        return (
                    <a href="#" className="group relative block">
                        {
                            data?.dishDetails?
                        
                        <div className="relative h-[350px] sm:h-[450px]">
                            {
                                data?.dishDetails?.image?.map((image)=>{
                                    return(
                                       
                                    <img
                                        src={image?.secure_url?image?.secure_url:Image}
                                        alt=""
                                className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                                      
                                    />
                                
                                    )
                                })
                            }
                            {
                                data?.resImages?.map((image)=>{
                                    return(
                            <img
                                src={image?.secure_url}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                            />
                            )
                        })
                    }
                        </div>:""
                    }
                        <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                            <h3 className="text-xl font-medium text-white">{data?.dishDetails?.name?data?.dishDetails?.name:"kuzhimanthy"}</h3>

                            <p className="mt-1.5 max-w-[40ch] text-xs text-white">
                                {data?.dishDetails?.catagory?data?.dishDetails?.catagory:"fry"}
                            </p>
                            {
                               
                                data?.dishDetails?
                            <Link to={`/user/dish-listing/${data?.ownerId}`}>
                            <span
                                className="mt-3 inline-block bg-orange-400 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                            >
                                Book Now
                            </span></Link>:""
    }
                        </div>
                    </a>
                )
            })
        }
                </div>
              
            </div>
        )
    }

export default ViewAllDish
