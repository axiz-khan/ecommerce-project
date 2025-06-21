import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menu from '../../AdminComponent/Menu/Menu';
import AllProTableRow from '../../components/AllProTableRow/AllProTableRow';
import "./AllProduct.css";
import useIsMobile from '../../hooks/useIsMobile'; // Adjust the path as needed
import MobileNav from '../../AdminComponent/Menu/MobileNav';

function AdminAllProduct() {
    const navigate = useNavigate();
    const [analytics, setAnalytics] = useState({
        totalProduct: 0,
        stockProduct: 0,
        stockOutProduct: 0,
    });
    const [products, setProducts] = useState([]);
      const isMobile = useIsMobile(); // returns true if width < 780

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await axios.get('http://localhost:8080/admin/analytics', { withCredentials: true });
                setAnalytics({
                    totalProduct: response.data.total_product,
                    stockProduct: response.data.stock_product,
                    stockOutProduct: response.data.stock_out_product,
                });
            } catch (error) {
                console.error('Error fetching analytics:', error.response?.data || error.message);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/admin/product', { withCredentials: true });
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error.response?.data || error.message);
            }
        };

        fetchAnalytics();
        fetchProducts();
    }, []);

    const handleAddProductClick = () => {
        navigate('/admin/product/add');
    };

    return (
        <div className='admin-products-container'>
            <div className="admin-home-menu">
        {isMobile ? <MobileNav /> : <Menu />}
      </div>
            <main className='admin-products-main'>
                <header className='admin-products-header'>
                    <h1>🌿 EverWood Inventory</h1>
                    <button className='add-product-btn' onClick={handleAddProductClick}>+ Add Product</button>
                </header>

                <section className='analytics-section'>
                    <div className='analytic-card total'>
                        <p>Total Products</p>
                        <h2>{analytics.totalProduct}</h2>
                    </div>
                    <div className='analytic-card in-stock'>
                        <p>In Stock</p>
                        <h2>{analytics.stockProduct}</h2>
                    </div>
                    <div className='analytic-card out-stock'>
                        <p>Out of Stock</p>
                        <h2>{analytics.stockOutProduct}</h2>
                    </div>
                </section>

                <section className='products-list-section'>
                    <h3 className='products-section-title'>🪴 All Bonsai Products</h3>
                    <div className='products-list'>
                        {products.map(product => (
                            <AllProTableRow
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                price={product.selling_price}
                                stock={product.stock}
                                img_url={product.img_url}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default AdminAllProduct;
