import React from 'react';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import './AllUserRow.css';

function AlluserRow({ user }) {
  const navigate = useNavigate();

  const handleInfoClick = () => {
    navigate(`/admin/user/${user._id}`);
  };

  return (
    <div className="alluserrow-card">
      <div className="alluserrow-cell name">{user.name}</div>
      <div className="alluserrow-cell id">{user._id}</div>
      <div className="alluserrow-cell address">{user.address || '—'}</div>
      <div className="alluserrow-cell status">{user.role}</div>
      <div className="alluserrow-cell action">
        <button onClick={handleInfoClick} className="info-btn">
          <InfoIcon />
        </button>
      </div>
    </div>
  );
}

export default AlluserRow;
