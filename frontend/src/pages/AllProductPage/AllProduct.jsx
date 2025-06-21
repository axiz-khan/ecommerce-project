import * as React from 'react';
import axios from 'axios';
import './AllProduct.css';
import MobileNav from '../../components/NavBars/NavBar';
import Nav from '../../components/NavBars/Nav';
import CardContainer from '../../components/Card/CardContainer';
import Footer from '../../components/footer/Footer';

function AllProduct() {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 700);
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        const handleSize = () => {
            setIsMobile(window.innerWidth <= 700);
        };
        window.addEventListener('resize', handleSize);
        handleSize();
        return () => window.removeEventListener('resize', handleSize);
    }, []);

    React.useEffect(() => {
        axios.get('http://localhost:8080/product')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, []);

    return (
        <div className="allproduct-page">
            {isMobile ? <MobileNav /> : <Nav />}

            <div className="allproduct-header">
                <h1>Explore All Products</h1>
                <p>Each category holds the full collection of bonsai treasures. Indulge yourself.</p>
            </div>

            <div className="allproduct-wrapper">
                {products.map((category, index) => (
                    <div className="allproduct-category-section" key={index}>
                        <h2 className="category-title">{category.name}</h2>
                        <CardContainer
                            
                            items={category.items}
                        />
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default AllProduct;
