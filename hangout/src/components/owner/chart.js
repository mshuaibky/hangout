import React,{useState,useEffect} from 'react'
import Apexcharts from 'react-apexcharts'
import {getYearlyData,
  getMonthlyData,
  getDailyData

} from '../../helpers/ownerHelper'
const Chart = () => {
    const ownerId = localStorage.getItem('ownerId');
    const [data,setData]=useState(0)
    const [monthly,setMonthly]=useState([])
    const [daily,setDaily]=useState(0)
    console.log(daily,'monthly');
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
        getYearlyData(ownerId).then((response) => {
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

      //monthly report
      useEffect(() => {
        getMonthlyData(ownerId).then((monthlyData) => {
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
    const dailyDate=new Date()
    const date = new Date(dailyDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    
    console.log(date,'date')
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
          getDailyData(ownerId).then((daily)=>{
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
{/* monthly data */}
      <div className="app mt-4">
      <h2 className='text-2xl font-bold text-black'>MONTHLY DATA</h2>
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
{/* end of monthly data */}

{/* daily data */}
      <div className="app mt-4">
      <h2 className='text-2xl font-bold text-black'>DAILY DATA</h2>
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
      {/* end of daily data */}
      </div>
  )
}

export default Chart
