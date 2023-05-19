import React, { useState, useEffect } from 'react'
import { getUserDetails } from '../../helpers/adminHelpers'
import Image from '../../assets/Scate.png'
function UserList() {
  const [details, setDetails] = useState([])
 
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 2
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const records = details.slice(firstIndex, lastIndex)
  console.log(records,'records');
  const nPage = Math.ceil(details.length / recordsPerPage)
  console.log(nPage,'page');
  const numbers=[...Array(nPage+1).keys()].slice(1)


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

  useEffect(() => {
    async function getData() {
      let data = await getUserDetails()
      console.log(data.data.data, 'useEffect');
      setDetails(data.data.data)

    }
    getData();
  }, [])
  return (
    <div>
      <section className="container px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Users
            </h2>

          </div>

        </div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span>Name</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Email
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Phone
                      </th>
                    
                    </tr>
                  </thead>
                  {
                    records.map((data) => {
                      return (
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                          <tr key='key'>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={Image}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">

                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-300">
                                    {data.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-12 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-white">

                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-300">
                                {data.email}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {data.phone}
                            </td>

                          </tr>

                        </tbody>)

                    })
                  }
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='align-content: flex-end;'>

      <div className=" mx-4 flex items-center">
        <a onClick={prePage} href="#" className=" text-sm font-semibold text-gray-900 ">
          Previous
        </a>
        {
         numbers.map((n,i)=>{

       return(
        <a
        onClick={()=>{changePage(n)}}
          key={i}
          href="#"
          className={`mx-2 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105`}
        >
     {n}
        </a>)
          })
        }


        <a 
        onClick={nextPage}
        href="#" className="mx-2 text-sm font-semibold text-gray-900">
          Next
        </a>
      </div>
      </div>
    </div>

  )
}

export default UserList
