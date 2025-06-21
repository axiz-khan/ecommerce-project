import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Replace with your backend URL
    withCredentials: true, // Ensure cookies are sent with requests
});

export default axiosInstance;
