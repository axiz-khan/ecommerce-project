import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../../AdminComponent/Menu/Menu';
import AlluserRow from './AlluserRow';
import useIsMobile from '../../hooks/useIsMobile'; // Adjust the path as needed
import MobileNav from '../../AdminComponent/Menu/MobileNav';
import './AllUser.css';

function AllUser() {
    const [analytics, setAnalytics] = useState({});
    const [users, setUsers] = useState([]);
     const isMobile = useIsMobile(); // returns true if width < 780

    useEffect(() => {
        const fetchData = async () => {
            try {
                const analyticsResponse = await axios.get('http://localhost:8080/admin/analytics', { withCredentials: true });
                setAnalytics(analyticsResponse.data);
                console.log(analyticsResponse.data);

                const usersResponse = await axios.get('http://localhost:8080/admin/user', { withCredentials: true });
                setUsers(usersResponse.data.users);
                console.log(usersResponse.data.users);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='admin-users-container'>
           <div className="admin-home-menu">
        {isMobile ? <MobileNav /> : <Menu />}
      </div>
            <main className='admin-users-main'>
                <header className='admin-users-header'>
                    <h1>🌿 All Users</h1>
                </header>

                <section className='analytics-section'>
                    <div className='analytic-card total'>
                        <p>Login Users</p>
                        <h2>{analytics.loginUser}</h2>
                    </div>
                    <div className='analytic-card in-stock'>
                        <p>Signin Users</p>
                        <h2>{analytics.SinginUser}</h2>
                    </div>
                    <div className='analytic-card out-stock'>
                        <p>Signout Users</p>
                        <h2>{analytics.SingoutUser}</h2>
                    </div>
                </section>

                <section className='users-list-section'>
                    <h3 className='users-section-title'>🪴 All Registered Users</h3>
                    <div className='users-list'>
                        {users.map(user => (
                            <AlluserRow
                                key={user._id}
                                user={user}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default AllUser;
