import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menu from '../../AdminComponent/Menu/Menu';
import './Itemadd.css';
import useIsMobile from '../../hooks/useIsMobile'; // Adjust the path as needed
import MobileNav from '../../AdminComponent/Menu/MobileNav';

function Itemadd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    actualPrice: '',
    discountedPrice: '',
    costPrice: '',
    stock: '',
    category: '',
    keywords: '',
    file: null,
  });

  const [categories, setCategories] = useState([]); // State to store categories
    const isMobile = useIsMobile(); // returns true if width < 780

  // Fetch categories from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/admin/category', { withCredentials: true })
      .then(response => {
        setCategories(response.data); 
        console.log(response.data); // Store the array of categories in state
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleAddItem = async (e) => {
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
      const response = await axios.post('http://localhost:8080/admin/product', data ,{ withCredentials: true }, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Item added successfully!');
      navigate('/admin/product');
    } catch (error) {
      console.error('Error adding item:', error.response?.data || error.message);
      alert('Failed to add item. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  return (
    <div className='itemadd-container'>
       <div className="admin-home-menu">
        {isMobile ? <MobileNav /> : <Menu />}
      </div>
      <div className='form-box'>
        <form onSubmit={handleAddItem}>
          <div className='form-section'>
            <h4 className='form-section-title'>Title & Description</h4>
            <input type="text" name="title" placeholder='Product Title' value={formData.title} onChange={handleInputChange} />
            <textarea name="description" placeholder='Product Description' value={formData.description} onChange={handleInputChange}></textarea>
          </div>

          <div className='form-section'>
            <h4 className='form-section-title'>Media</h4>
            <input type='file' onChange={handleFileChange} />
            {formData.file && (
              <div className='image-preview'>
                <img src={URL.createObjectURL(formData.file)} alt="Preview" />
              </div>
            )}
          </div>

          <div className='form-section'>
            <h4 className='form-section-title'>Pricing</h4>
            <input type="number" name="actualPrice" placeholder='Actual Price' value={formData.actualPrice} onChange={handleInputChange} />
            <input type="number" name="discountedPrice" placeholder='Discounted Price' value={formData.discountedPrice} onChange={handleInputChange} />
            <input type="number" name="costPrice" placeholder="Cost Price (Not Visible to Customers)" value={formData.costPrice} onChange={handleInputChange} />
          </div>

          <div className='form-section'>
            <h4 className='form-section-title'>Inventory</h4>
            <input type="number" name="stock" placeholder='Stock Quantity' value={formData.stock} onChange={handleInputChange} />
          </div>

          <div className='form-section'>
            <h4 className='form-section-title'>Search Keywords</h4>
            <input type="text" name="category" placeholder='Category' value={formData.category} onChange={handleInputChange} />
            <textarea name="keywords" placeholder='Add Keywords' value={formData.keywords} onChange={handleInputChange}></textarea>
          </div>

          <div className='form-buttons'>
            <button type="submit" className="btn-submit">Add Item</button>
            <button type="button" onClick={handleCancel} className="btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Itemadd;
