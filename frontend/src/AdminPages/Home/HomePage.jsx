import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../../AdminComponent/Menu/Menu';
import useIsMobile from '../../hooks/useIsMobile'; // Adjust the path as needed
import MobileNav from '../../AdminComponent/Menu/MobileNav';

import './HomePage.css';

function AdminHomePage() {
  const [homeData, setHomeData] = useState(null);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [newBanner, setNewBanner] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const isMobile = useIsMobile(); // returns true if width < 780

  useEffect(() => {
    axios.get('http://localhost:8080/admin/home', { withCredentials: true })
      .then(res => {
        const { home, categories, existingCategories } = res.data;
        setHomeData(existingCategories);
        setBanners(home.banner.map(b => b.img_url));
        setCategories(home.category.map(c => c.name));
        setAllCategories(categories);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDeleteBanner = (img) => {
    setBanners(prev => prev.filter(i => i !== img));
  };

  const handleCategoryChange = (index, value) => {
    const updated = [...categories];
    updated[index] = value;
    setCategories(updated);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewBanner(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('banner', JSON.stringify(banners));
    formData.append('categories', JSON.stringify(categories));
    if (newBanner) formData.append('file', newBanner);

    try {
      await axios.put('http://localhost:8080/admin/home', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      alert('Homepage updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update homepage.');
    }
  };

  return (
    <div className="admin-home-container">
      <div className="admin-home-menu">
        {isMobile ? <MobileNav /> : <Menu />}
      </div>

      <div className={`admin-home-content ${isMobile ? 'mobile' : ''}`}>
        <h2 className="admin-home-heading">Admin Home</h2>

        {/* Banners */}
        <div className="admin-banner-section">
          <h3>Banners</h3>
          <div className="custom-file-input-wrapper">
            <label htmlFor="banner-upload" className="custom-file-label">Choose Banner</label>
            <input
              id="banner-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
            {previewUrl && <img src={previewUrl} alt="Preview" className="preview-image" />}
          </div>

          <div className="banner-scroll">
            {banners.map((img, i) => (
              <div className="banner-item" key={i}>
                <img src={`http://localhost:8080/${img}`} alt="banner" />
                <button onClick={() => handleDeleteBanner(img)}>X</button>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        {homeData && Object.values(homeData).map((cat, idx) => (
          <div key={cat._id} className="category-section">
            <h3>{cat.name}</h3>
            <div className="category-items">
              {cat.items.map((item, index) => (
                <div className="item-card" key={index}>
                  <img src={`http://localhost:8080/${item.img_url}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>Price: ₹{item.selling_price}</p>
                  <p>Rating: {item.rate}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Category Dropdowns */}
        <div className="category-dropdowns">
          {categories.map((cat, idx) => (
            <select
              key={idx}
              value={cat}
              onChange={(e) => handleCategoryChange(idx, e.target.value)}
            >
              {allCategories.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          ))}
        </div>

        <button className="admin-home-submit" onClick={handleSubmit}>Update Homepage</button>
      </div>
    </div>
  );
}

export default AdminHomePage;
