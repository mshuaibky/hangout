import React,{useEffect, useState} from 'react'
import Apexcharts from 'react-apexcharts'
import {adminYearlyData,
    adminMonthlyData,
    adminDailyData
} from '../../helpers/adminHelpers'
function Graph() {
    const [data,setData]=useState(0)
    const [monthly,setMonthly]=useState([])
    const [daily,setDaily]=useState(0)
    console.log(data,'data..');
    //getting yearly data
    const [options,setOptions]=useState({
        chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: [2023]
          }
    })

    const [series,setSeries]=useState([
        {
          name: "series-1",
          data: [data]
        }
      ])
      useEffect(() => {
        adminYearlyData().then((response) => {
            console.log(response,'response,,,');
          const fetchedData = response?.data?.data[0];
          const numericData = Number(fetchedData); // Convert string to number
    
          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: [2023],
            },
          }));
    
          setSeries((prevSeries) => [
            {
              ...prevSeries[0],
              data: [numericData],
            },
          ]);
    
          setData(numericData);
        });
      }, []);
      //monthly data
      const [options1,setOptions1]=useState({
        chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']

          }
    })

    const [series1,setSeries1]=useState([
        {
          name: "series-1",
          data: [monthly]
        }
      ])
      useEffect(() => {
        adminMonthlyData().then((monthlyData) => {
          const fetchedMonthlyData = monthlyData?.data?.data;
          setMonthly(fetchedMonthlyData);
      
          setSeries1([
            {
              name: "series-1",
              data: fetchedMonthlyData
            }
          ]);
        });
      }, []);
      //daily data
      const [options2,setOptions2]=useState({
        chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: ['Today']

          }
    })

    const [series2,setSeries2]=useState([
        {
          name: "series-1",
          data: [daily]
        }
      ])
      useEffect(()=>{
        adminDailyData().then((daily)=>{
          console.log(daily,'daily');
          const fetchedData= (daily?.data?.data)
          const numericData = Number(fetchedData); // Convert string to number
  
          setOptions2((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: ['Today'],
            },
          }));
    
          setSeries2((prevSeries) => [
            {
              ...prevSeries[0],
              data: [numericData],
            },
          ]);
    
          setDaily(numericData);
        })
    },[])
  
  return (
    <div className='mx-20 grid grid-cols-2 gap-2'>
    <div className="app mt-4">
        <h2 className='text-2xl font-bold text-black'>YEARLY DATA</h2>
        <div className="row">
          <div className="mixed-chart">
            <Apexcharts
              options={options}
              series={series}
              type="bar"
              width="500"
            />
          </div>
        </div>
        </div>

        {/* monthly data start */}
        <div className="app mt-4">
        <h2 className='text-2xl font-bold text-black'>YEARLY DATA</h2>
        <div className="row">
          <div className="mixed-chart">
            <Apexcharts
              options={options1}
              series={series1}
              type="bar"
              width="500"
            />
          </div>
        </div>
        </div>
        {/* daily data */}
        <div className="app mt-4">
        <h2 className='text-2xl font-bold text-black'>YEARLY DATA</h2>
        <div className="row">
          <div className="mixed-chart">
            <Apexcharts
              options={options2}
              series={series2}
              type="bar"
              width="500"
            />
          </div>
        </div>
        </div>
    </div>
  )
}

export default Graph