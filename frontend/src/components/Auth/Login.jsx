import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/login',
                { username, password },{withCredentials:true}
            // Enable sending cookies
            );
            const { role } = response.data;
             // Assume role is returned in the response
            dispatch(login({ role })); // Dispatch login with role
            alert('Login successful!');
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;