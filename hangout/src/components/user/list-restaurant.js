import React, { useEffect, useState } from 'react'
import { getAllRestaurnts,getPaginatedRes } from '../../helpers/userHelpers'



import { Link } from 'react-router-dom'

function ListRestaurant() {

    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 6
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = data.slice(firstIndex, lastIndex)
    console.log(records,'records');
    const nPage = Math.ceil(data.length / recordsPerPage)
    console.log(nPage,'page');
    const numbers=[...Array(nPage+1).keys()].slice(1)
    console.log(numbers,'numbers');
//    const [page,setPage]=useState(1)
//    const [pageCount,setPageCount]=useState(0)
   const [search,setSearch]=useState('')
    useEffect(() => {
        sessionStorage.clear();
    }, [])

    useEffect(() => {
        getAllRestaurnts().then((result) => {
            console.log('kdkdk');
            console.log(result,'namma data');
            setData(result?.data?.data)
        })

        // // getPaginatedRes(page).then((datas)=>{
        // //     console.log('dkkdk');
        // //     console.log(datas,'paginated data');
        // //     setData(datas?.data?.data)
           
        // //     if(datas){
             
        // //         setPageCount(datas?.data?.pageCount)
        // //     }
        // })
    
    }, [])
  
   

    const prePage=()=>{
        if(currentPage!==1){
         setCurrentPage(currentPage-1)
        }
      }
      const changePage=(id)=>{
      setCurrentPage(id)
      }
      const nextPage=()=>{
     if(currentPage!==nPage){
       setCurrentPage(currentPage+1)
     }
      }


//    const handlePrev=()=>{

//      setPage((p)=>{
//         if(p===1)return p
//         return p-1
//      })
//    }
// const handleNext=()=>{
    
// setPage((p)=>{
   
//     if(p=== pageCount)return p 
//     return p+1
// })
// }
    return (
        <div >
            <form class="flex items-center mt-4  mx-20">   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input 
        onChange={(e)=>{setSearch(e.target.value)}}
        type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
    </div>

</form>
            <div className="min-h-screen flex justify-center items-center py-8">
                <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
                    {
                        records.filter((data)=>{
                            return search.toLowerCase() === ''? data:data.resName.toLowerCase()
                            .includes(search)
                        }).map((items) => {

                            return (

                                <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                                    <div className="relative">


                                        <img className="w-full h-64 rounded-xl" src={items.resImages[0].secure_url} alt="Colors" />

                                    </div>
                                    <h3 className="m-2 text-xl font-bold text-indigo-600">{items.resName} </h3>
                                    <h5 className="m-2 text-gray-800 text-lg font-bold cursor-pointer">{items.resAddress}</h5>
                                    <div className="my-4">
                                        <div className="flex space-x-1 items-center">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path fill="currentColor" d="M6 20v-1h12v1a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zM4 4h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z" />
                                                </svg>
                                            </span>
                                            <b>{items.numberOfTables}</b>

                                        </div>
                                        <div className="flex space-x-1 items-center">
                                            <span>
                                                <svg height={'16'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" stroke="currentColor">
                                                    <path fill="currentColor" d="M17,2H7A2,2,0,0,0,5,4v16a2,2,0,0,0,2,2h10a2,2,0,0,0,2-2V4A2,2,0,0,0,17,2Zm-6,16a1,1,0,1,1,1-1A1,1,0,0,1,11,18Zm4-4a1,1,0,1,1,1-1A1,1,0,0,1,15,14Zm0-4a1,1,0,1,1,1-1A1,1,0,0,1,15,10Z" />

                                                </svg>
                                            </span>
                                            <b>{items.phone}</b>

                                        </div>

                                        <Link to={`/user/dish-listing/${items?.ownerId}`} ><button className="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">Book Now</button></Link>

                                    </div>
                                </div>)



                        })
                    }
                </div>
            </div>

            {/* pagination */}

            <div className='align-content: flex-end;'>

<div className=" mx-4 flex items-center">
  <a onClick={prePage} 
   className=" text-sm font-semibold text-gray-900 ">
    Previous
  </a>
  {
   numbers.map((n,i)=>{

 return(
  <a
  onClick={()=>{changePage(n)}}
    key={i}

    className='mx-2 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105'
  >
{n}
  </a>)
    })
  }


  <a 
  onClick={nextPage}
 className="mx-2 text-sm font-semibold text-gray-900">
    Next
  </a>
</div>
</div>

      
            {/* <div class="flex flex-col items-center ">


                <div class="inline-flex mt-2 xs:mt-0">
                    <button
                        disabled={page === 1}
                        onClick={handlePrev}

                        class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-l hover:bg-blue-900 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-700 dark:hover:text-white">
                        Prev
                    </button>
                    <button
                        disabled={page === pageCount}
                        onClick={handleNext}
                        class="px-4 py-2 text-sm font-medium text-white bg-blue-500 border-0 border-l border-blue-700 rounded-r hover:bg-blue-900 dark:bg-blue-800 dark:border-gray-700 dark:text-blue-400 dark:hover:bg-gray-blue dark:hover:text-white">
                        Next
                    </button>
                </div>
            </div> */}
{/*pagination end */}
<footer class="relative bg-blueGray-200 pt-10 pb-6 bg-slate-200 mt-3">
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
                    <hr class="my-6 border-blueGray-300"/>
                        <div class="flex flex-wrap items-center md:justify-between justify-center">
                            <div class="w-full md:w-4/12 px-4 mx-auto text-center">
                                <div class="text-sm text-blueGray-500 font-semibold py-1">
                                    Copyright © <span id="get-current-year">2023</span>
                                        <p  class="text-blueGray-500 hover:text-blueGray-800">Hangout</p>.
                                </div>
                            </div>
                        </div>
                </div>
            </footer>
        </div>
    )
}

export default ListRestaurant
