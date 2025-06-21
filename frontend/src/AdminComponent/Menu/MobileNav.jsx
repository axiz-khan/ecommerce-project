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
import './MobileNavs.css';

function MobileNav() {
  const location = useLocation();

  return (
    <div className="mobile-admin-nav-container">
      <NavLink
        className={({ isActive }) => isActive ? 'mobile-link-active' : 'mobile-link'}
        to="/admin/home"
      >
        <FaHome className="mobile-icon" />
      </NavLink>

      <NavLink
        className={() => location.pathname.startsWith('/admin/order') ? 'mobile-link-active' : 'mobile-link'}
        to="/admin/order"
      >
        <FaShoppingCart className="mobile-icon" />
      </NavLink>

      <NavLink
        className={() => location.pathname.startsWith('/admin/product') ? 'mobile-link-active' : 'mobile-link'}
        to="/admin/product"
      >
        <FaBoxOpen className="mobile-icon" />
      </NavLink>

      <NavLink
        className={({ isActive }) => isActive ? 'mobile-link-active' : 'mobile-link'}
        to="/admin/analytics"
      >
        <FaChartBar className="mobile-icon" />
      </NavLink>

      <NavLink
        className={({ isActive }) => isActive ? 'mobile-link-active' : 'mobile-link'}
        to="/"
      >
        <FaGlobe className="mobile-icon" />
      </NavLink>

      <NavLink
        className={() => location.pathname.startsWith('/admin/user') ? 'mobile-link-active' : 'mobile-link'}
        to="/admin/user"
      >
        <FaUsers className="mobile-icon" />
      </NavLink>
    </div>
  );
}

export default MobileNav;
