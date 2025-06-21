import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MobileNav from '../../components/NavBars/NavBar';
import Nav from '../../components/NavBars/Nav';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import LoginIcon from '@mui/icons-material/Login';
import Footer from '../../components/footer/Footer';
import { login } from '../../redux/authSlice';
import "./Login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 700);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  React.useEffect(() => {
    // Resize listener for mobile check
    const handleResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/items/auth/login',
        { email, password }, { withCredentials: true }
      );

      const { role, accestoken } = response.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${accestoken}`;

      localStorage.setItem('role', role);
      localStorage.setItem('accestoken', accestoken);

      dispatch(login({ role }));
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
  
      <div className='main-login'>
        <div className='login-nav'>
        {isMobile ? <MobileNav /> : <Nav />}
        </div>
        
        <div className='login-box'>
          <div className='login-header'>
            <span>LOGIN</span>
          </div>
          <div className='input-div'>
            <input
              type="text"
              placeholder='Email*'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder='Password*'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='remember-div'>
            <div className='remember-box'>
              <input type="checkbox" id='remember-check' />
              <span>Remember me?</span>
            </div>
          </div>
          <div className='logfor-div'>
            <div className='logbtn'>
              <button className='login-button' onClick={handleLogin}>
                <LoginIcon style={{ fontSize: "20px", marginRight: "10px" }} /> Login
              </button>
              <div className='forget-pass-div'>
                <a href="">Forget Password</a>
              </div>
            </div>
          </div>
          <div className='account-need'>
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
