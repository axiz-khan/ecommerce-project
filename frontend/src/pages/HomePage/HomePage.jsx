import React from 'react';
import axios from 'axios';
import Banner from '../../components/Banner/Banner';
import MobileNav from '../../components/NavBars/NavBar';
import Nav from '../../components/NavBars/Nav'; 
import NoticeBar from '../../components/NoticeBar/NoticeBar';
import CardContainer from '../../components/Card/CardContainer';
import Footer from '../../components/footer/Footer';
import "./HomePage.css";
import "../../components/NavBars/MainNav.css";

function HomePage() {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 700);
    const [bannerData, setBannerData] = React.useState([]);
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        const handleSize = () => {
            setIsMobile(window.innerWidth <= 700);
        };
        window.addEventListener("resize", handleSize);
        handleSize();

        return () => {
            window.removeEventListener("resize", handleSize);
        };
    }, []);

    React.useEffect(() => {
        axios.get('http://localhost:8080/home')
            .then(response => {
                const data = response.data;
                setBannerData(data.home.banner);
                setCategories(Object.values(data.existingCategories));
            })
            .catch(error => {
                console.error("Error fetching home data:", error);
            });
    }, []);

    return (
        <div className='home-page'>
            <NoticeBar />
            
                {isMobile ? <MobileNav /> : <Nav />}
        
            <div className='banner-container'>
                <Banner banners={bannerData} />
            </div>
            <div className='categories-container'>
                {categories.map((category, index) => (
                    <CardContainer
                        key={index}
                        cateName={category.name}
                        items={category.items}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
