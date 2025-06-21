import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../../AdminComponent/Menu/Menu';
import OrderRow from '../../AdminComponent/OrderRow/OrderRow';
import './OrderPage.css';
import useIsMobile from '../../hooks/useIsMobile'; // Adjust the path as needed
import MobileNav from '../../AdminComponent/Menu/MobileNav';

function OrderPage() {
    const [analytics, setAnalytics] = useState({});
    const [orders, setOrders] = useState([]);
      const isMobile = useIsMobile(); // returns true if width < 780

    useEffect(() => {
        const fetchOrdersAndAnalytics = async () => {
            try {
                const response = await axios.get('http://localhost:8080/admin/order', { withCredentials: true });
                setOrders(response.data.order || []);
                setAnalytics(response.data.analytics || {});
            } catch (error) {
                console.error('Error fetching orders and analytics:', error);
                alert("Failed to load order data. Please try again later.");
            }
        };
    
        fetchOrdersAndAnalytics();
    }, []);

    return (
        <div className='orderpage-container'>
                <div className="admin-home-menu">
        {isMobile ? <MobileNav /> : <Menu />}
      </div>
            <main className='orderpage-main'>
                <header className='orderpage-header'>
                    <h1>🌿 EverWood Orders</h1>
                </header>

                <section className='analytics-section'>
                    <div className='analytic-card in-process'>
                        <p>Orders In Process</p>
                        <h2>{analytics.process_order || 0}</h2>
                    </div>
                    <div className='analytic-card shipped'>
                        <p>Orders Shipped</p>
                        <h2>{analytics.total_orders || 0}</h2>
                    </div>
                    <div className='analytic-card canceled'>
                        <p>Canceled Orders</p>
                        <h2>{analytics.cancel_orders || 0}</h2>
                    </div>
                </section>

                <section className='orders-section'>
                    <h3 className='orders-section-title'>🛒 All Orders</h3>
                    <div className='orders-header'>
                        <div>Order ID</div>
                        <div>User</div>
                        <div>Address</div>
                        <div>Date</div>
                        <div>Price</div>
                        <div>Status</div>
                        <div>Action</div>
                    </div>
                    <div className='orders-list'>
                        {orders.map(order => (
                            <OrderRow key={order._id} order={order} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default OrderPage;
