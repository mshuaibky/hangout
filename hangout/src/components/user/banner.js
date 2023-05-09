import React, { useEffect, useState } from 'react'

const Banner = () => {
  
    const banners = [
        {
            no: 1,
            banner: 'https://i.pinimg.com/564x/0e/73/4f/0e734f0371d50d6cb59ea698af6940ce.jpg'
        },
        {
            no: 2,
            banner: 'https://i.pinimg.com/564x/0e/73/4f/0e734f0371d50d6cb59ea698af6940ce.jpg'
        },
        {
            no: 3,
            banner: 'https://i.pinimg.com/564x/0e/73/4f/0e734f0371d50d6cb59ea698af6940ce.jpg'
        },
        {
            no: 4,
            banner: 'https://i.pinimg.com/564x/0e/73/4f/0e734f0371d50d6cb59ea698af6940ce.jpg'
        },
        {
            no: 5,
            banner: 'https://i.pinimg.com/564x/0e/73/4f/0e734f0371d50d6cb59ea698af6940ce.jpg'
        }

    ]
    const [bannerNo, setBannerNo] = useState(0)
    useEffect(() => {
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        const rndInt = randomIntFromInterval(0, 4)
        setBannerNo(rndInt)

    }, [])

    return (
        <div
            class="relative overflow-hidden bg-cover bg-no-repeat p-12 text-center"
            style={{ backgroundImage: `url(${banners[bannerNo]?.banner})`, height: "500px" }}>
            <div
                class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
              >
                <div class="flex h-full items-center justify-center">
                    <div class="text-white">
                        <h2 class="mb-4 text-4xl font-semibold">Hungry!!</h2>

                        <h4 class="mb-6 mt-2 text-xl font-semibold">just book in your Favaourite
                        restaurant with Hangout</h4>
                       
                             
                                
                        

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner