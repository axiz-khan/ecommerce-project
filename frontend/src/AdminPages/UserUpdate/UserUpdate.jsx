import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Menu from '../../AdminComponent/Menu/Menu';
import useIsMobile from '../../hooks/useIsMobile'; // Adjust the path as needed
import MobileNav from '../../AdminComponent/Menu/MobileNav';
import './EditUser.css';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
    const isMobile = useIsMobile(); // returns true if width < 780
  const [user, setUser] = useState({
    name: '',
    email: '',
    addresses: [],
    role: 'User',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/admin/user/${id}`, { withCredentials: true });
        const { name, email, address, role } = res.data;
        setUser({
          name,
          email,
          addresses: Array.isArray(address) ? address : [address],
          role,
        });
      } catch (error) {
        console.error('Failed to fetch user:', error.message);
        alert('Error fetching user details');
      }
    };
    fetchUser();
  }, [id]);

  const handleRoleChange = (e) => {
    setUser({ ...user, role: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/admin/user/${id}`, { role: user.role }, { withCredentials: true });
      alert('User role updated!');
      navigate('/admin/users');
    } catch (error) {
      console.error('Update error:', error.message);
      alert('Failed to update user.');
    }
  };

  const handleCancel = () => {
    navigate('/admin/users');
  };

  return (
    <div className="edituser-main">
     <div className="admin-home-menu">
        {isMobile ? <MobileNav /> : <Menu />}
      </div>
      <div className="edituser-content">
        <h2>Edit User</h2>
        <div className="edituser-profile">
          <img alt="User Avatar" className="edituser-avatar" />
          <div className="edituser-info">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <div>
              <strong>Address:</strong>
              <ul>
                {user.addresses.map((addr, idx) => (
                  <li key={idx}>{addr}</li>
                ))}
              </ul>
            </div>
            <label><strong>Role:</strong></label>
            <select value={user.role} onChange={handleRoleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div className="edituser-buttons">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
