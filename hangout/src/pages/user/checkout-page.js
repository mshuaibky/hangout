import React from 'react'
import Checkout from '../../components/user/checkout'
import Header from '../../components/user/header'
import Footer from '../../components/user/footer'
import ProductReview1 from '../../components/user/review'
import RatingClone from '../../components/user/ratingClone'
function CheckoutPage() {
  return (
    <div>
      <Header/>
    <Checkout/>
    {/* <Footer/> */}
    <RatingClone/>
    
    </div>
  )
}

export default CheckoutPage
