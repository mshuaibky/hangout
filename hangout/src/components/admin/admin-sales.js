import React, { useState, useEffect,useRef } from 'react'
import { getOrderDetails } from '../../helpers/ownerHelper'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf';

function AdminSales() {
    const ownerId = localStorage.getItem('ownerId');
    const user = localStorage.getItem('persist:1');
    const parsedData = JSON.parse(user);
    const users = JSON.parse(parsedData.user).user.user;
    const [sales, setSales] = useState([])
    const tableRef = useRef(null);


    const generatePDF=()=>{
        console.log('hello');
        html2canvas(tableRef.current).then((canvas)=>{
            console.log(canvas,'canvas');
            const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save('sales report.pdf');
        })
    }

    useEffect(() => {
        getOrderDetails(ownerId, users).then((data) => {
            setSales(data?.data?.data)
        })
    }, [])

    return (
        <div>
            <section className="container px-4 mx-auto py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                            Sales Report
                        </h2>

                    </div>
                    <button 
                     onClick={generatePDF}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Download
                    </button>

                </div>
                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" ref={tableRef}>
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
                                                Total Price
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Type
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
                                        sales.map((data) => {
                                            console.log(data?.date, 'data');
                                            const timestamp = data?.date
                                            const date = timestamp.slice(0, 10);
                                            return (
                                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                                                    <tr key='key'>
                                                        <td className="py-4 px-4 whitespace-nowrap">
                                                            <div className="flex items-center">

                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">

                                                                    </div>
                                                                    <div className="text-sm text-gray-500 dark:text-gray-300">
                                                                        {data?.userId?.name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-12 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900 dark:text-white">

                                                            </div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-300">
                                                                {data?.userId?.email}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                            {data?.total}
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                            {data?.orderType}
                                                        </td>

                                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                            {date}
                                                        </td>

                                                    </tr>

                                                </tbody>
                                            )
                                        })
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminSales