    import React, { useState, useEffect } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { useSelector, useDispatch } from 'react-redux';
    import { logout } from '../../redux/authSlice';
    import axios from 'axios';
    import SearchIcon from '@mui/icons-material/Search';
    import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
    import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
    import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
    import "./Nav.css";

    function Nav() {
        const [isSize, setIssize] = useState(window.innerWidth <= 700);
        const [scrolled, setScrolled] = useState(false);
        const [showDropdown, setShowDropdown] = useState(false);
        const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Get login state from Redux
        const role = useSelector((state) => state.auth.role); // Get user role from Redux
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            const handleResize = () => {
                setIssize(window.innerWidth <= 700);
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        useEffect(() => {
            const handleScroll = () => {
                setScrolled(window.scrollY > 90);
                setShowDropdown(false); // Close dropdown on scroll
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);

        const toggleDropdown = () => {
            setShowDropdown(prev => !prev);
        };

        const handleLogout = async () => {
            try {
                await axios.get('http://localhost:8080/logout', { withCredentials: true });
                localStorage.removeItem('accestoken');
                localStorage.removeItem('role');
                dispatch(logout()); // Update Redux state
                alert('Logged out successfully!');
            } catch (error) {
                console.error('Logout failed:', error.response?.data || error.message);
                alert('Logout failed. Please try again.');
            }
        };

        const handleSignout = async () => {
            try {
                await axios.get('http://localhost:8080/singout', { withCredentials: true });
                dispatch(logout()); // Update Redux state
                alert('Signed out successfully!');
            } catch (error) {
                console.error('Signout failed:', error.response?.data || error.message);
                alert('Signout failed. Please try again.');
            }
        };

        // console.log('Is Logged In:', isLoggedIn); // Debug Redux state

        return (
            <div className={`navbar-container ${scrolled ? "navbar-scroled" : ""}`}>
                {isSize ? (
                    <button className='menu-button'><MenuOutlinedIcon style={{ color: "#C2A878" }} /></button>
                ) : (
                    <div className='link-container'>
                        <div><span><Link to="/">Home</Link></span></div>
                        {role === 'admin' && (
                            <div><span><Link to="/admin">admin</Link></span></div>
                        )}
                        <div><span><Link to="/order-page">Order</Link></span></div>
                        <div><span><Link to="/products">Shop</Link></span></div>
                        <div><span><Link to="/about">About Us</Link></span></div>
                    </div>
                )}

                <div className='logo-container'>
                    <div>
                        <Link to="/">
                            <img
                                src="/logo.png"
                                alt="EverWood Logo"
                                className="nav-logo"
                            />
                        </Link>
                    </div>
                </div>

                <div className='srcbtn-container'>
                    <div className='inp-comp'>
                        <input type="text" placeholder='  search' />
                        <button><SearchIcon style={{ color: "#C2A878" }} /></button>
                    </div>

                    <div className='acc-btn'>
                        <button onClick={toggleDropdown}>
                            <AccountCircleOutlinedIcon style={{ color: "#C2A878" }} className='button-transition' />
                        </button>

                        {/* DROPDOWN */}
                        <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                            {isLoggedIn ? (
                                <>
                                    {/* <p>Role: {useSelector((state) => state.auth.role)}</p> Display user role */}
                                    <button className="dropdown-btn" onClick={handleLogout}>Logout</button>
                                    <button className="dropdown-btn" onClick={handleSignout}>Signout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="dropdown-btn">Login</Link>
                                    <Link to="/signup" className="dropdown-btn">Signup</Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className='shp-btn'>
                        <button onClick={() => navigate('/cart')}>
                            <ShoppingBagOutlinedIcon style={{ color: "#C2A878" }} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    export default Nav;
