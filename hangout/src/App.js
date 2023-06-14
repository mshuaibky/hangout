import './App.css';
import {BrowserRouter,Routes,Route,}from 'react-router-dom'
import Login from './pages/user/login'
import Register from './pages/user/signUp';
import Home from './pages/user/home'
import SignUp from './pages/owner/signup'
import OwnerLogin from './pages/owner/login'
import OwnerHome from './pages/owner/restaurant'
import AddRestaurant from './pages/owner/add-restaurant';
import OwnerList from './pages/adimin/owner-list';
import UserList from './pages/adimin/user-list'
// import AdminSignUp from './pages/adimin/signup';
import AdminLogin from './pages/adimin/login';
import ViewDish from './pages/owner/view-dishes'
import AddDish from './components/owner/add-dishes'
import Otp from './components/user/otp';
import Verify from './components/user/varify-otp'
import EditDish from './components/owner/edit-dish';
import EditRestaurant from './components/owner/edit-restaurant';
import OwnerDetailPage from './pages/owner/owner-detail-page';

import LishDishPage from './pages/user/list-dish-page';
import AddTablePage from './pages/owner/add-table-page';
import TableForm from './components/owner/table-form';
import CheckoutPage from './pages/user/checkout-page';
import PaymentPage from './pages/user/payment-page';
import OrderPage from './pages/user/order-page';
import OrderPageOwner from './pages/owner/order-page-owner';
import ViewBannerPage from './pages/owner/view-banner-page';
import AddBanner from './components/owner/add-banner';
import ViewAllDishPage from './pages/user/view-all-dish-page';
import OrderViewPage from './pages/owner/order-view-more-page';
import RestaurantPage from './pages/adimin/restaurant-page';
import DashboardPage from './pages/owner/dashboard-page';
import SalesPage from './pages/owner/sales-page';
import DashAdminPage from './pages/adimin/dashboard-page'
import AdminSalesPage from './pages/adimin/admin-sales-page';
import ProfilePage from './pages/user/profile-page';

function App() {
  return (
   <div>
    <BrowserRouter>
    <Routes>

      {/* User Route */}

    <Route path='/' element={<Home/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/user/verify' element={<Verify/>}/>
     <Route path='/user/otp' element={<Otp/>}/>
     <Route path='/user/dish-listing/:id' element={<LishDishPage/>}/>
     <Route path='/user/checkout' element={<CheckoutPage/>}/>
     <Route path='/payment'  element={<PaymentPage/>}/>
     <Route path='/orders'  element={<OrderPage/>}/>
     <Route path='/view-all-dishes'  element={<ViewAllDishPage/>}/>
     <Route path='/profile'  element={<ProfilePage/>}/>
     
      
     {/* Owner route */}

     <Route path='/sign-up' element={<SignUp/>}/>
     <Route path='/owner-login' element={<OwnerLogin/>}/>
     <Route path='/owner-home' element={<OwnerHome/>}/>
     <Route path='/add-restaurant' element={<AddRestaurant/>}/>
     <Route path='/owner/view-dish' element={<ViewDish/>}/>
     <Route path='/owner/add-dish' element={<AddDish/>}/>
     <Route path='/owner/edit-dish/:id' element={<EditDish/>}/>
     <Route path='/owner/edit-restaurant/:id' element={<EditRestaurant/>}/>
     <Route path='/owner/more-details' element={<OwnerDetailPage/>}/>
     <Route path='/owner/add-table' element={<AddTablePage/>}/>
     <Route path='/owner/table-form' element={<TableForm/>}/>
     <Route path='/owner/order' element={<OrderPageOwner/>}/>
     <Route path='/owner/banner' element={<ViewBannerPage/>}/>
     <Route path='/owner/add-banner' element={<AddBanner/>}/>
     <Route path='/owner/order-view-more/:id' element={<OrderViewPage/>}/>
     <Route path='/owner/dashboard' element={<DashboardPage/>}/>
     <Route path='/owner/sales' element={<SalesPage/>}/>


      {/* admin Routes */}
      
     <Route path='/admin/owner-list' element={<OwnerList/>}/>
     <Route path='/admin/login' element={<AdminLogin/>}/>
     <Route path='/admin/user-list' element={<UserList/>}/>
     <Route path='/admin/restuarant' element={<RestaurantPage/>}/>
     <Route path='/admin/dashboard' element={<DashAdminPage/>}/>
     <Route path='/admin/sales-report' element={<AdminSalesPage/>}/>

    </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
