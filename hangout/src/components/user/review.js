import React, { useState, useEffect } from "react";
import { getReview } from '../../helpers/userHelpers'
import { FaStar } from 'react-icons/fa';

const ProductReview1 = ({ input }) => {
    const owId = sessionStorage.getItem('ID');
    const parsedData = JSON.parse(owId);
    const id = parsedData.ownerId
  
    console.log(id,'......');
    const ownerId = localStorage.getItem('ownerId');
    console.log(ownerId, 'id owner');
    const [review, setReview] = useState([])
    console.log(review, '////////');

    useEffect(() => {
        async function getData(id) {
          
            let data = await getReview(id)
            console.log(data, 'data');
            setReview(data?.data?.data)

        }
        getData(id);
    }, [input])
    return (


        <div>
            <h2 className="mx-10 text-3xl font-bold text-black">Ratings</h2>
            {
                review?.map((data) => {
                    return (
                        <div class="mx-10 flex flex-col gap-3 mt-6">
                            <div class="flex flex-col gap-4 bg-white ">

                                <div>
                                    <div class="flex justify justify-between">
                                        <div class="flex gap-2">
                                            <div class="w-7 h-7 text-center rounded-full bg-red-500">{data.name.charAt(0)}</div>
                                            <span>{data?.name}</span>


                                        </div>

                                    </div>


                                    <div className="mt-6 flex flex-row ">
                                        {[...Array(parseInt(data.rating))].map((star, index) => {


                                            return (
                                                <label >


                                                    <FaStar
                                                        className=""
                                                        size={20}
                                                        color={data.rating ? "#ffc107" : ""}

                                                    />
                                                </label>
                                            );
                                        })}
                                    </div>


                                    <div className="mt-4">
                                        {data?.comment}
                                    </div>

                                </div>

                            </div>

                        </div>


                    )
                })
            }
            <footer class="mt-3 relative bg-blueGray-200 pt-10 pb-6 bg-slate-200">
                <div class="container mx-auto px-4">
                    <div class="flex flex-wrap text-left lg:text-left">
                        <div class="w-full lg:w-6/12 px-4">
                            <h4 class="text-3xl fonat-semibold text-blueGray-700">Let's keep in touch!</h4>
                            <h5 class="text-lg mt-0 mb-2 text-blueGray-600">
                                Find the best Restautants in Kochi
                            </h5>
                            <div class="mt-6 lg:mb-0 mb-6">
                                <button class="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i class="fab fa-twitter"></i></button><button class="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i class="fab fa-facebook-square"></i></button><button class="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i class="fab fa-dribbble"></i></button><button class="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i class="fab fa-github"></i>
                                </button>
                            </div>
                        </div>
                        <div class="w-full lg:w-6/12 px-4">
                            <div class="flex flex-wrap items-top mb-6">
                                <div class="w-full lg:w-4/12 px-4 ml-auto">
                                    <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Useful Links</span>
                                    <ul class="list-unstyled">
                                        <li>
                                            <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="">About Us</a>
                                        </li>
                                        <li>
                                            <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="">Blog</a>
                                        </li>
                                        <li>
                                            <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="">Restaurants</a>
                                        </li>
                                        <li>
                                            <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="">Cafe</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="w-full lg:w-4/12 px-4">
                                    <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Other Resources</span>
                                    <ul class="list-unstyled">
                                        <li>
                                            <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile">MIT License</a>
                                        </li>
                                        <li>
                                            <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/terms?ref=njs-profile">Terms &amp; Conditions</a>
                                        </li>
                                        <li>
                                            <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/privacy?ref=njs-profile">Privacy Policy</a>
                                        </li>
                                        <li>
                                            <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/contact-us?ref=njs-profile">Contact Us</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="my-6 border-blueGray-300" />
                    <div class="flex flex-wrap items-center md:justify-between justify-center">
                        <div class="w-full md:w-4/12 px-4 mx-auto text-center">
                            <div class="text-sm text-blueGray-500 font-semibold py-1">
                                Copyright © <span id="get-current-year">2023</span>
                                <p class="text-blueGray-500 hover:text-blueGray-800">Hangout</p>.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>


    );
};

export default ProductReview1;
