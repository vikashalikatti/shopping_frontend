import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar.jsx';
import Login from './Components/Merchant/Login.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Components/Merchant/Register.jsx';
import Otppage from './Components/Merchant/Otppage.jsx';
import Merchant_home from './Components/Merchant/Merchant_home.jsx';
import Forgot_password from './Components/Merchant/Forgot_password.jsx';
import Forget_otp_page from './Components/Merchant/Forget_otp_page.jsx';
import Resetpassword from './Components/Merchant/Resetpassword.jsx';
import Add_product from './Components/Merchant/Add_product.jsx';
import Fetch_all_product from './Components/Merchant/Fetch_all_product.jsx';
import Admin_Login from './Components/Admin/Admin_Login.jsx';
import Admin_signup from './Components/Admin/Admin_signup.jsx';
import Admin_Home from './Components/Admin/Admin_Home.jsx';
import Admin_View_all_products from './Components/Admin/Admin_View_all_products.jsx';
import AdminViewAllMerchants from './Components/Admin/AdminViewAllMerchants.jsx';
import AdminViewAllCustomer from './Components/Admin/AdminViewAllCustomer.jsx';
import AdminAddPayment from './Components/Admin/AdminAddPayment.jsx';
import AdminViewAllPayment from './Components/Admin/AdminViewAllPayment.jsx';
import ViewAllProduct from './Components/Customer/ViewAllProduct.jsx';
import CustomerLogin from './Components/Customer/CustomerLogin.jsx'
import CustomerSignup from './Components/Customer/CustomerSignup.jsx'
import CustomerVerification from './Components/Customer/CustomerVerification.jsx'
import Createwishlist from './Components/Customer/Createwishlist.jsx';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    const userData = JSON.parse(storedUserData);
    setIsLoggedIn(Boolean(userData));
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<ViewAllProduct/>}/>
        <Route path="/merchant/login" element={isLoggedIn ? <Merchant_home /> : <Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/merchant/verify-otp/:email" element={<Otppage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/merchant-dashboard" element={<Merchant_home/>} />
        <Route path="/forgot-password" element={<Forgot_password/>} />
        <Route path="/merchant/forgot-otp/:email" element={<Forget_otp_page/>} />
        <Route path="/resetpassword" element={<Resetpassword/>} />
        <Route path="/merchant-dashboard/add-products" element={<Add_product/>} />
        <Route path="/merchant-dashboard/view-products" element={<Fetch_all_product/>} />
        <Route path="/admin" element={<Admin_Login/>}/>
        <Route path='/admin_signup' element={<Admin_signup/>}/>
        <Route path='/admin/home' element={<Admin_Home/>}/>
        <Route path='/admin/view-all-products' element={<Admin_View_all_products/>}/>
        <Route path='/admin/view-all-merchants' element={<AdminViewAllMerchants/>}/>
        <Route path='/admin/view-all-customers' element={<AdminViewAllCustomer/>}/>
        <Route path='/admin/payment-add' element={<AdminAddPayment/>}/>
        <Route path='/admin/view-all-payment' element={<AdminViewAllPayment />}/>
        <Route path='/login/customer' element={<CustomerLogin/>}/>
        <Route path='/customer/register' element={<CustomerSignup/>}/>
        <Route path="/verify/:email/:token" element={<CustomerVerification />} />
        <Route path="/customer/create_wishlist" element={<Createwishlist/>}/>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
