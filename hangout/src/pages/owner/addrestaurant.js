import React from 'react'

function addrestaurant() {
  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    {Data.map((item) => (
      <div
        key={item.id}
        className="rounded overflow-hidden shadow-lg dark:shadow-gray-800"
      >
        <img className="w-full" src={item.image} alt="Mountain" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{item.title}</div>
          <p className="text-gray-700 dark:text-gray-300 text-base">
            {item.description.substring(0, 100)}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
  )
}

export default addrestaurant
