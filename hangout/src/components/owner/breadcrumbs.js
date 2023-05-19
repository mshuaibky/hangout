import React from 'react'
import { Home } from 'lucide-react'

function Breadcrumbs() {
  return (
    <div>
       <nav className="flex w-full items-start rounded-md bg-gray-100 p-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a
            href="#"
            className="ml-1 inline-flex text-sm font-medium text-gray-800 hover:underline md:ml-2"
          >
            <Home className="mr-4 h-4 w-4" />
            Documentation
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <span className="mx-2.5 text-gray-800 ">/</span>
            <a href="#" className="ml-1 text-sm font-medium text-gray-800 hover:underline md:ml-2">
              Application UI
            </a>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <span className="mx-2.5 text-gray-800 ">/</span>
            <span className="ml-1 text-sm font-medium text-gray-800 hover:underline md:ml-2">
              Breadcrumbs
            </span>
          </div>
        </li>
      </ol>
    </nav>
    </div>
  )
}

export default Breadcrumbs
