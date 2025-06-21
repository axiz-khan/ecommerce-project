// DetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menu from '../../AdminComponent/Menu/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useIsMobile from '../../hooks/useIsMobile'; // Adjust the path as needed
import MobileNav from '../../AdminComponent/Menu/MobileNav';
import "./DetailPage.css";

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productData, setProductData] = useState({});
    const [comments, setComments] = useState([]);
      const isMobile = useIsMobile(); // returns true if width < 780

    useEffect(() => {
        const token = localStorage.getItem('accestoken');
        axios.get(`http://localhost:8080/admin/product/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => setProductData(response.data))
        .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:8080/comments/${id}`)
        .then(response => setComments(response.data.comments || []))
        .catch(error => console.error('Error fetching comments:', error));
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            const response = await axios.delete(`http://localhost:8080/admin/product/${id}`, {
                withCredentials: true,
            });
            alert(response.data.message);
            navigate('/admin/products');
        } catch (error) {
            alert("Failed to delete the product. Please try again.");
        }
    };

    return (
        <div className='detailpage-container'>
            <div className="admin-home-menu">
        {isMobile ? <MobileNav /> : <Menu />}
      </div>

            <div className='detailpage-content'>
                <div className='detailpage-header-bar'>
                    <h1 className='detailpage-title'>Product Details</h1>
                    <div className='detailpage-action-buttons'>
                        <button onClick={() => navigate(`/admin/product/update/${id}`)} className="icon-button">
                            <EditIcon />
                        </button>
                        <button onClick={handleDelete} className="icon-button danger">
                            <DeleteIcon />
                        </button>
                    </div>
                </div>

                <div className='detail-card'>
                    <div className='detail-image' style={{ backgroundImage: `url(http://localhost:8080/${productData.img_url})` }} />
                    <div className='detail-info'>
                        <div className='info-section'>
                            <label>Name</label>
                            <p>{productData.name}</p>
                        </div>
                        <div className='info-section'>
                            <label>Category</label>
                            <p>{productData.category?.name || productData.category || "No category"}</p>
                        </div>
                        <div className='info-section full'>
                            <label>Description</label>
                            <p>{productData.discription}</p>
                        </div>
                    </div>
                </div>

                <div className='detail-card'>
                    <h2>Pricing</h2>
                    <div className='info-row'>
                        <div className='info-section'>
                            <label>Cost Price</label>
                            <p>{productData.cost_price}</p>
                        </div>
                        <div className='info-section'>
                            <label>Selling Price</label>
                            <p>{productData.selling_price}</p>
                        </div>
                        <div className='info-section'>
                            <label>Discount %</label>
                            <p>{productData.discount_percentage}</p>
                        </div>
                    </div>
                </div>

                <div className='detail-card'>
                    <h2>Inventory</h2>
                    <div className='info-row'>
                        <div className='info-section'>
                            <label>Stock Quantity</label>
                            <p>{productData.stock}</p>
                        </div>
                        <div className='info-section'>
                            <label>Status</label>
                            <p>{productData.stock == 0 ? "Out of Stock" : "In Stock"}</p>
                        </div>
                    </div>
                </div>

                <div className='detail-card'>
                    <h2>Additional Information</h2>
                    <div className='info-row'>
                        <div className='info-section'>
                            <label>Added Date</label>
                            <p>{new Date(productData.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className='info-section'>
                            <label>Keywords</label>
                            <p>{productData.keywords || "No keywords"}</p>
                        </div>
                    </div>
                </div>

                <div className='comments-section'>
                    <h2>User Comments</h2>
                    {comments.length ? comments.map((comment, idx) => (
                        <div className='comment-card' key={idx}>
                            <p><strong>User:</strong> {comment.userId}</p>
                            <p><strong>Comment:</strong> {comment.comment}</p>
                            <p><strong>Rating:</strong> {comment.rating || "No rating"}</p>
                        </div>
                    )) : <p>No comments available for this product.</p>}
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
