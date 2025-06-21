import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./AllProTableRow.css";
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

function AllProTableRow({ id, name, price, stock, img_url }) {
  const navigate = useNavigate();

  const handleInfoClick = () => {
    navigate(`/admin/product/${id}`);
  };

  const handleEditClick = () => {
    navigate(`/admin/product/update/${id}`);
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:8080/admin/product/${id}`, {
        withCredentials: true,
      });
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
      alert("Failed to delete the product. Please try again.");
    }
  };

  return (
    <div className={`allprorow-container ${stock === 0 ? 'out-of-stock' : 'in-stock'}`}>
      <div
        className="product-image"
        style={{ backgroundImage: `url(http://localhost:8080/${img_url})` }}
      ></div>

      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">₹{price}</p>
        <p className="product-stock">
          {stock > 0 ? `In Stock (${stock})` : 'Out of Stock'}
        </p>
      </div>

      <div className="product-actions">
        <button onClick={handleInfoClick} className="action-btn info">
          <InfoIcon />
        </button>
        <button onClick={handleEditClick} className="action-btn edit">
          <EditIcon />
        </button>
        <button onClick={handleDeleteClick} className="action-btn delete">
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default AllProTableRow;
