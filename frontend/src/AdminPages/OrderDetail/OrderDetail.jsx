import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import MeMenu from '../../AdminComponent/Menu/Menu';
import OrederDetailRow from '../../AdminComponent/OrderDetailRow/OrederDetailRow';
import useIsMobile from '../../hooks/useIsMobile'; // Adjust the path as needed
import MobileNav from '../../AdminComponent/Menu/MobileNav';

import './OrderDetail.css';

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState('placed');
  const isMobile = useIsMobile(); // returns true if width < 780
  const open = Boolean(anchorEl);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/order/${id}`, { withCredentials: true })
      .then((response) => {
        setOrderDetails(response.data);
        setStatus(response.data.status);
      })
      .catch((error) => console.error('Error fetching order details:', error));
  }, [id]);

  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose1 = (event) => {
    setAnchorEl(null);
    setStatus(event.target.innerText);
  };

  const handleUpdate = () => {
    if (!orderDetails?._id) {
      alert('Order ID is missing!');
      return;
    }

    axios
      .put(`http://localhost:8080/admin/order/${orderDetails._id}`, { status }, { withCredentials: true })
      .then(() => {
        alert('Order updated successfully!');
        navigate('/admin/order');
      })
      .catch((error) => {
        console.error('Error updating order:', error);
        alert('Failed to update the order. Please try again.');
      });
  };

  const handleCancel = () => {
    navigate('/admin/order');
  };

  return (
    <div className='orderdetail-main-container'>
      <div className="admin-home-menu">
        {isMobile ? <MobileNav /> : <MeMenu />}
      </div>
      <div className='orderdetail-main-box'>
        <div className='orderdetail-main-head'>
          <h2 className='orderdetail-title'>Order Detail</h2>
          <Divider />
        </div>
        <div className='orderdetail-main-body'>
          <div className='orderdetail-info-body'>
            <div className='orderdetail-info-box'>
              <div className='oderdetail-info-head'>Order ID: </div>
              <div className='oderdetail-info-data'>{orderDetails?._id || 'Loading...'}</div>
            </div>
            <div className='orderdetail-info-box'>
              <div className='oderdetail-info-head'>Customer Name:</div>
              <div className='oderdetail-info-data'>{orderDetails?.name || 'Loading...'}</div>
            </div>
            <div className='orderdetail-info-box'>
              <div className='oderdetail-info-head'>Date: </div>
              <div className='oderdetail-info-data'>
                {orderDetails?.date
                  ? new Date(orderDetails.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'Loading...'}
              </div>
            </div>
            <div className='orderdetail-info-box' style={{ width: '25rem' }}>
              <div className='oderdetail-info-head'>Address: </div>
              <div className='oderdetail-info-data'>{orderDetails?.address || 'Loading...'}</div>
            </div>
            <div className='orderdetail-info-box'>
              <div className='oderdetail-info-head'>Total Price: </div>
              <div className='oderdetail-info-data'>{orderDetails?.price || 'Loading...'}</div>
            </div>
          </div>
          <div className='oderdetail-info-status'>
            <div className='orderdetail-info-status-head'>Status</div>
            <div>
              <Button
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick1}
                className='orderdetail-status-btn'
              >
                {status}
              </Button>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose1}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose1}>placed</MenuItem>
                <MenuItem onClick={handleClose1}>pending</MenuItem>
                <MenuItem onClick={handleClose1}>canceled</MenuItem>
                <MenuItem onClick={handleClose1}>deliver</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <div className='orderdetail-main-product'>
          <div className='orderdetail-info-status-head'>Products</div>
          <div style={{ margin: '10px' }}>
            <Divider />
          </div>
          <div className='orderdetail-all-products'>
            {orderDetails?.items?.map((item) => (
              <OrederDetailRow key={item.itemId} item={item} />
            )) || 'Loading...'}
          </div>
        </div>
        <div className='orderdetail-buttons'>
          <Button variant='contained' color='primary' onClick={handleUpdate} className='update-button'>
            Update
          </Button>
          <Button variant='contained' color='secondary' onClick={handleCancel} className='cancel-button'>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
