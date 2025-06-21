import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'; // Import the CSS file for styling

const Menu = () => {
  return (
    <nav>
      {/* ...existing menu items... */}
      <Link to="/admin/home">Home</Link>
      {/* ...existing menu items... */}
    </nav>
  );
};

export default Menu;