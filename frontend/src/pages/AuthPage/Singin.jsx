import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MobileNav from '../../components/NavBars/NavBar';
import Nav from '../../components/NavBars/Nav';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import Footer from '../../components/footer/Footer';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import "./Login.css";

function Singin() {
    const dispatch = useDispatch(); // Hook to dispatch actions
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 700);
    const [address, setAddress] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    React.useEffect(() => {
        // Resize listener for mobile check
        const handleResize = () => setIsMobile(window.innerWidth <= 700);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:8080/items/auth/singup', { name, email, password, address }, { withCredentials: true });
            // const accessToken = response.data.accestoken;
            console.log(response.data);
            // const { role, accestoken } = response.data;
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('accestoken', response.data.accestoken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accestoken}`;
            // Store the access token in Axios headers for subsequent requests


            dispatch(login(response.data.role)); // Update Redux state
            alert('Signup successful!');
            navigate('/'); // Redirect to home page
        } catch (error) {
            // console.error('Signup failed:', error.response?.data || error.message);
            alert('Signup failed. Please check your details.');
        }
    };

    return (
        <>
            <div className='main-login'>
            <div className='login-nav'>
        {isMobile ? <MobileNav /> : <Nav />}
        </div>
                <div className='login-box'>
                    <div className='login-login'><span>SIGNUP</span></div>
                    <div className='input-div sing-input-div'>
                        <input
                            type="text"
                            placeholder='Name*'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='Email*'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='Address*'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder='Password*'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='logfor-div'>
                        <div className='logbtn'>
                            <button className='login-button' onClick={handleSignup}>
                                <PersonIcon style={{ fontSize: "20px", marginRight: "10px" }} /> CREATE ACCOUNT
                            </button>
                        </div>
                    </div>
                    <div className='account-need'>
                        Already have an account <Link to="/login">Click Here</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Singin;