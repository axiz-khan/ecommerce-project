import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice';
import axios from 'axios';
import HomePage from './pages/HomePage/HomePage';
import AdminHomePage from "./AdminPages/Home/HomePage";
import Login from './pages/AuthPage/Login';
import Singin from './pages/AuthPage/Singin';
import AllProduct from './pages/AllProductPage/AllProduct';
import Detail from './pages/DetailPage/Detail';
import AdminAllProduct from './AdminPages/AllProductPage/AllProduct';
import DetailPage from './AdminPages/DetailPage/DetailPage';
import OrderPage from './AdminPages/OrderPage/OrderPage';
import OrderDetail from './AdminPages/OrderDetail/OrderDetail';
import AllUser from './AdminPages/AllUserPage/AllUser';
import AnalyticalPage from './AdminPages/AnalyticalPage/AnalyticalPage';
import Itemadd from './AdminPages/ItemAdd/Itemadd';
import ItemUpdate from './AdminPages/ItemUpdatePage/ItemUpdate';
import UserUpdate from './AdminPages/UserUpdate/UserUpdate';
import Cart from './pages/Cart/Cart';
import UserorderPage from './pages/OrderPage/OrderPage' // Import the OrderPage component
import AboutPage from './pages/AboutPage/AboutPage';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Check local storage for access token and role
    const accessToken = localStorage.getItem('accestoken');
    const role = localStorage.getItem('role');

    if (accessToken && role) {
      // Set Axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      // Dispatch the role to Redux
      dispatch(login({ role }));
    }
  }, [dispatch]);
  return (
    <Routes>
      {/* User Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Singin />} />
      <Route path="/products" element={<AllProduct />} />
      <Route path="/product/:id" element={<Detail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order-page" element={<UserorderPage />} />
      <Route path="/about" element={<AboutPage/>}/>

      {/* Admin Pages */}
      <Route path="/admin" element={<AnalyticalPage />} />
      <Route path="/admin/home" element={<AdminHomePage />} />
      <Route path="/admin/product" element={<AdminAllProduct />} />
      <Route path="/admin/product/:id" element={<DetailPage />} />
      <Route path="/admin/order" element={<OrderPage />} />
      <Route path="/admin/order/:id" element={<OrderDetail />} />
      <Route path="/admin/user" element={<AllUser />} />
      <Route path="/admin/analytics" element={<AnalyticalPage />} />
      <Route path="/admin/product/add" element={<Itemadd />} />
      <Route path="/admin/product/update/:id" element={<ItemUpdate />} />
      <Route path="/admin/user/:id" element={<UserUpdate />} />
    </Routes>
  );
}

export default App;
