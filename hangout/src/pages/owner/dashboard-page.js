import React from 'react'
import Dashboard from '../../components/owner/dashboard'
import Navbar from '../../components/owner/navbar'
import Chart from '../../components/owner/chart'

const DashboardPage = () => {
  return (
    <div>
      <Navbar/>
      <Dashboard/>
      <Chart/>
    </div>
  )
}

export default DashboardPage
