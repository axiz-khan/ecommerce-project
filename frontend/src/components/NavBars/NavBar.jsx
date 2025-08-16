import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './NavBar.css';

function MobileNav() {
    const [open, setOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleButtonClick = () => {
        setIsActive(true);
    };

    const handleOutsideClick = (event) => {
        if (isActive) {
            setIsActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isActive]);

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:8080/logout', { withCredentials: true });
            localStorage.removeItem('accestoken');
            localStorage.removeItem('role');
            dispatch(logout());
            alert('Logged out successfully!');
        } catch (error) {
            console.error('Logout failed:', error.response?.data || error.message);
            alert('Logout failed. Please try again.');
        }
    };

    const DrawerList = (
        <Box sx={{ width: 250, backgroundColor: '#0B3D2E', height: '100vh' }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/">
                        <ListItemText primary="Home" style={{ color: "#DED2BF" }} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/products">
                        <ListItemText primary="Shop" style={{ color: "#DED2BF" }} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/order-page">
                        <ListItemText primary="Order" style={{ color: "#DED2BF" }} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/about">
                        <ListItemText primary="About Us" style={{ color: "#DED2BF" }} />
                    </ListItemButton>
                </ListItem>

                {role === 'admin' && (
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/admin">
                            <ListItemText primary="Admin" style={{ color: "#DED2BF" }} />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </Box>
    );
    return (
        <div className="mobile-navbar">
            {isActive ? (
                <div className="searchbar-div">
                    <input type="text" className="mobile-search" placeholder="Search" />
                    <button className="icon-button">
                        <SearchIcon style={{ color: "#C2A878" }} />
                    </button>
                </div>
            ) : (
                <>
                    <button className="menu-button" onClick={toggleDrawer(true)}>
                        <MenuOutlinedIcon style={{ color: "#C2A878" }} />
                    </button>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>

                    <div className="mobile-logo">
                        <Link to="/">
                            <div>
                                <Link to="/">
                                    <img
                                        src="/logo.png"
                                        alt="EverWood Logo"
                                        className="mobile-nav-logo"
                                    />
                                </Link>
                            </div>
                        </Link>
                    </div>

                    <div className="mobile-icons">
                        <button className="icon-button" onClick={(e) => { e.stopPropagation(); handleButtonClick(); }}>
                            <SearchIcon style={{ color: "#C2A878" }} />
                        </button>
                        <button className="icon-button">
                            <AccountCircleOutlinedIcon style={{ color: "#C2A878" }} onClick={() => setShowDropdown(!showDropdown)} />
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    {isLoggedIn ? (
                                        <>
                                            <button className="dropdown-btn" onClick={handleLogout}>Logout</button>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/login" className="dropdown-btn">Login</Link>
                                            <Link to="/signup" className="dropdown-btn">Signup</Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </button>
                        <button className="icon-button" onClick={() => navigate('/cart')}>
                            <ShoppingBagOutlinedIcon style={{ color: "#C2A878" }} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default MobileNav;
