import React, { useEffect, useState } from 'react';
import { getBanners } from '../../helpers/ownerHelper';

const Banner = () => {
  const [banner, setBanner] = useState([]);
  const ownerId = localStorage.getItem('ownerId');
  
  useEffect(() => {
    getBanners(ownerId).then((data) => {
      console.log(data, 'banners');
      setBanner(data?.data?.data);
    });
  }, []);

 
  const randomIndex = Math.floor(Math.random() * banner.length);
  const selectedBanner = banner[randomIndex] || {};
  return (
    <div>
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat p-12 text-center"
        style={{ backgroundImage: `url(${selectedBanner?.image})`, height: "500px" }}
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
          <div className="flex h-full items-center justify-center">
            <div className="text-white">
              <h2 className="mb-4 text-4xl font-semibold">{selectedBanner?.mainDiscription}</h2>
              <h4 className="mb-6 mt-2 text-xl font-semibold">{selectedBanner?.subDiscription}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
