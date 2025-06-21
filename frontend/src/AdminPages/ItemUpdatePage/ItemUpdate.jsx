import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Menu from '../../AdminComponent/Menu/Menu';
import "./ItemUpdate.css";
import useIsMobile from '../../hooks/useIsMobile'; // Adjust the path as needed
import MobileNav from '../../AdminComponent/Menu/MobileNav';

function ItemUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile(); // returns true if width < 780
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    actualPrice: '',
    discountedPrice: '',
    costPrice: '',
    stock: '',
    // category: '',
    // keywords: '',
    file: null,
    imageUrl: '', // Added imageUrl to state
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/product/${id}`,{withCredentials:true});
        
        const product = response.data;
        console.log(product);
        

        setFormData({
          title: product.name,
          description: product.discription,
          actualPrice: product.selling_price,
          discountedPrice: product.discount_percentage,
          costPrice: product.cost_price,
          stock: product.stock,
          category: product.category.name,
          // keywords: product.keywords,
          file: null,
          imageUrl: `http://localhost:8080/${product.img_url}`, // Correct URL for displaying the image
        });
      } catch (error) {
        console.error('Error fetching product:', error.response?.data || error.message);
        alert('Failed to fetch product details.');
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.title);
    data.append('discription', formData.description);
    data.append('selling_price', formData.actualPrice);
    data.append('discount_percentage', formData.discountedPrice);
    data.append('cost_price', formData.costPrice);
    data.append('stock', formData.stock);
    data.append('category', formData.category);
    data.append('keywords', formData.keywords);
    data.append('file', formData.file);

    try {
      await axios.put(`http://localhost:8080/admin/product/${id}`, data,{withCredentials:true}, {
        headers: { 'Content-Type': 'multipart/form-data' },
      
      });
      alert('Product updated successfully!');
      navigate('/admin/product');
    } catch (error) {
      console.error('Error updating product:', error.response?.data || error.message);
      alert('Failed to update product. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  return (
    <div className='itemupdate-main-component'>
         <div className="admin-home-menu">
        {isMobile ? <MobileNav /> : <Menu />}
      </div>
      <div className='itemupdate-main-box'>
        <form onSubmit={handleUpdateItem}>
          <div className='itemupdate-heading'>
            <h2>Update Product</h2>
          </div>
          <div className='itemupdate-section'>
            <h3>Basic Details</h3>
            <h4>Name</h4>
            
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} />
            <h4>Description</h4>
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange}></textarea>
          </div>
          <div className='itemupdate-section'>
            <h3>Pricing</h3>
            <h4>Selling Price</h4>
            <input type="number" name="actualPrice" placeholder="Actual Price" value={formData.actualPrice} onChange={handleInputChange} />
            <h4>Discount Percentage</h4>
            <input type="number" name="discountedPrice" placeholder="Discount Percentage" value={formData.discountedPrice} onChange={handleInputChange} />
            <h4>Cost Price</h4>
            <input type="number" name="costPrice" placeholder="Cost Price" value={formData.costPrice} onChange={handleInputChange} />
          </div>
          <div className='itemupdate-section'>
            <h3>Inventory</h3>
            <h4>Stock</h4>
            <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleInputChange} />
          </div>
          <div className='itemupdate-section'>
            <h3>Search</h3>
            <h4>Category</h4>
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} />
            <h4>KeyWords</h4>
            <textarea name="keywords" placeholder="Keywords" value={formData.keywords} onChange={handleInputChange}></textarea>
          </div>
          <div className='itemupdate-section'>
            <h4>Media</h4>
            {formData.imageUrl && (
              <div className="existing-image" style={{ backgroundImage: `url(${formData.imageUrl})` }}>
                {/* Display existing image */}
              </div>
            )}
            <input type="file" onChange={handleFileChange} />
          </div>
          <div className='itemupdate-buttons'>
            <button type="submit" className="update-btn" >Update Item</button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemUpdate;
