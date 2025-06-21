import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../../AdminComponent/Menu/Menu';
import HorizontalDivider from '../../components/HorizontalDivider/HorizontalDivider';
import "./AnalyticalPage.css";
import useIsMobile from '../../hooks/useIsMobile'; // Adjust the path as needed
import MobileNav from '../../AdminComponent/Menu/MobileNav';

function AnalyticalPage() {
  const [analyticsData, setAnalyticsData] = useState(null);
   const isMobile = useIsMobile(); // returns true if width < 780

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/analytics', { withCredentials: true });
        setAnalyticsData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error.message);
        alert('Error fetching analytics data');
      }
    };

    fetchAnalytics();
  }, []);

  if (!analyticsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='analytical-container'>
      <div className='analytical-sidebar'>
      <div className="admin-home-menu">
        {isMobile ? <MobileNav /> : <Menu />}
      </div>
      </div>
      <div className='analytical-content'>
        <div className='analytical-section'>
          <div className='analytical-card'>
            <div className='analytical-header'>USER</div>
            <div className='analytical-details'>
              <div className='info-item'>
                <p className='info-label'>Login Users</p>
                <p className='info-value' style={{ color: "#C2A878" }}>{analyticsData.loginUser}</p>
              </div>
              <div className='info-item'>
                <p className='info-label'>Signup Users</p>
                <p className='info-value' style={{ color: "#114B3C" }}>{analyticsData.SinginUser}</p>
              </div>
              <div className='info-item'>
                <p className='info-label'>Signout Users</p>
                <p className='info-value' style={{ color: "#B85C38" }}>{analyticsData.SingoutUser}</p>
              </div>
            </div>
          </div>
          <HorizontalDivider />
          <div className='analytical-card'>
            <div className='analytical-header'>ORDERS</div>
            <div className='analytical-details'>
              <div className='info-item'>
                <p className='info-label'>Total Orders</p>
                <p className='info-value' style={{ color: "#C2A878" }}>{analyticsData.total_orders}</p>
              </div>
              <div className='info-item'>
                <p className='info-label'>Orders In Process</p>
                <p className='info-value' style={{ color: "#114B3C" }}>{analyticsData.process_order}</p>
              </div>
              <div className='info-item'>
                <p className='info-label'>Cancelled Orders</p>
                <p className='info-value' style={{ color: "#B85C38" }}>{analyticsData.cancel_orders}</p>
              </div>
            </div>
          </div>
          <HorizontalDivider />
          <div className='analytical-card'>
            <div className='analytical-header'>PRODUCTS</div>
            <div className='analytical-details'>
              <div className='info-item'>
                <p className='info-label'>Total Products</p>
                <p className='info-value' style={{ color: "#C2A878" }}>{analyticsData.total_product}</p>
              </div>
              <div className='info-item'>
                <p className='info-label'>Products In Stock</p>
                <p className='info-value' style={{ color: "#114B3C" }}>{analyticsData.stock_product}</p>
              </div>
              <div className='info-item'>
                <p className='info-label'>Products Out of Stock</p>
                <p className='info-value' style={{ color: "#B85C38" }}>{analyticsData.stock_out_product}</p>
              </div>
            </div>
          </div>
          <HorizontalDivider />
          <div className='analytical-card'>
            <div className='analytical-header'>PROFIT</div>
            <div className='analytical-details'>
              <div className='info-item'>
                <p className='info-label'>Lifetime Sales</p>
                <p className='info-value' style={{ color: "#C2A878" }}>{analyticsData.lifetime_sales}</p>
              </div>
              <div className='info-item'>
                <p className='info-label'>Lifetime Profit</p>
                <p className='info-value' style={{ color: "#114B3C" }}>{analyticsData.lifetime_profit}</p>
              </div>
              <div className='info-item'>
                <p className='info-label'>Total Product Costs</p>
                <p className='info-value' style={{ color: "#B85C38" }}>{analyticsData.total_cost}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticalPage;
