import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaShoppingCart,
  FaBoxOpen,
  FaChartBar,
  FaUsers,
  FaGlobe
} from 'react-icons/fa';
import "./Menu.css";

function Menu() {
  const location = useLocation();

  return (
    <div className='menu-main-container'>
      <div className='menu-main-box'>

        <NavLink 
          className={({ isActive }) => isActive ? 'admin-link-active' : 'admin-link'} 
          to='/admin/home'
        >
          <FaHome className="admin-icon" /> Home
        </NavLink>

        <NavLink 
          className={() => location.pathname.startsWith('/admin/order') ? 'admin-link-active' : 'admin-link'} 
          to='/admin/order'
        >
          <FaShoppingCart className="admin-icon" /> Order
        </NavLink>

        <NavLink 
          className={() => location.pathname.startsWith('/admin/product') ? 'admin-link-active' : 'admin-link'} 
          to='/admin/product'
        >
          <FaBoxOpen className="admin-icon" /> Product
        </NavLink>

        <NavLink 
          className={({ isActive }) => isActive ? 'admin-link-active' : 'admin-link'} 
          to='/admin/analytics'
        >
          <FaChartBar className="admin-icon" /> Analytics
        </NavLink>

        <NavLink 
          className={({ isActive }) => isActive ? 'admin-link-active' : 'admin-link'} 
          to='/'
        >
          <FaGlobe className="admin-icon" /> Website
        </NavLink>

        <NavLink 
          className={() => location.pathname.startsWith('/admin/user') ? 'admin-link-active' : 'admin-link'} 
          to='/admin/user'
        >
          <FaUsers className="admin-icon" /> Users
        </NavLink>

      </div>
    </div>
  );
}

export default Menu;
