import React, { useState,useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useFormik } from 'formik';
import toast from 'react-hot-toast'
import {ratingData,getUser} from '../../helpers/userHelpers'
import ProductReview1 from './review';


function RatingClone() {
    const ownerId = localStorage.getItem('ownerId');
    const user = localStorage.getItem('persist:1');
    const parsedData = JSON.parse(user);
    const userId = JSON.parse(parsedData.user).user.user;

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [name,setName]=useState('')
    const [input, setInput] = useState('')
   


    const handleRatingChange = (currentRating) => {
        setRating(currentRating);
    };

useEffect(()=>{
    getUser(userId).then((result)=>{
        if(result){
           setName(result.data.data.name)
        }
        console.log(result,'userDAta');
    })
},[])

    const formik = useFormik({
        initialValues: {
            comment: ''
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            const id = { ownerId: ownerId }
            const rat={rating:rating}
            const userName={name:name}
            const data = Object.assign({}, values, id, rat,userName)
            console.log(data,'namma data');
            let details = ratingData(data)
            
            toast.promise(details, {
                loading: 'adding...',
                success: <b>added successfully</b>,
                error: <b>failed to add rating</b>
            })
            details.then((data)=>{
                console.log(data,'data');
            })
            formik.values.comment = ''
            setInput(data)
        }
    })
    return (
        <>
        <div>
            <div className="mx-auto max-w-7xl px-2 py-10 lg:px-0">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl font-bold text-black">RATE US</h2>

                        <div className="mt-6 grid grid-cols-5 gap-1">
                            {[...Array(5)].map((star, index) => {
                                const currentRating = index + 1;

                                return (
                                    <label htmlFor={`star-${currentRating}`} key={currentRating}>
                                        <input
                                            id={`star-${currentRating}`}
                                            type="radio"
                                            name="rating"
                                            value={currentRating}
                                            onClick={() => handleRatingChange(currentRating)}
                                        />

                                        <FaStar
                                            className="star"
                                            size={50}
                                            color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                            onMouseEnter={() => setHover(currentRating)}
                                            onMouseLeave={() => setHover(null)}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                    <div className="mt-10 w-full md:w-1/2 lg:mt-0">
                        <form onSubmit={formik.handleSubmit} className="flex lg:justify-center">
                            <div className="flex w-full max-w-md items-center space-x-2">
                                <input
                                    name='comment'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.comment}
                                    className="flex h-40 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Add comment"
                                />
                                <button

                                    type="submit"
                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <ProductReview1 input={input}/>
     </>
    );
}

export default RatingClone;
