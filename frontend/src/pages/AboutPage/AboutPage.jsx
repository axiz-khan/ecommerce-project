import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Nav from '../../components/NavBars/Nav';
import MobileNav from '../../components/NavBars/NavBar';
import NoticeBar from '../../components/NoticeBar/NoticeBar';
import Footer from '../../components/footer/Footer';

import './AboutPage.css';

const AboutPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  useEffect(() => {
    AOS.init({ duration: 1200 });
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="about-page">
      <NoticeBar />
      {/* <div className="main-navbar"> */}
        {isMobile ? <MobileNav /> : <Nav />}
        {/* </div> */}

      <section className="hero-section" data-aos="fade-up">
        <h1>About EverWood</h1>
        <p>
          We blend art, nature, and serenity into living spaces with elegant Bonsai trees.
        </p>
      </section>

      <section className="image-text-section" data-aos="fade-right">
        <img
          src="https://wallpaperbat.com/img/302406-bonsai-tree-wallpaper.jpg"
          alt="Crafting Bonsai"
        />
        <div className="text">
          <h2>Rooted in Tradition</h2>
          <p>
            At EverWood, every bonsai is a story—painstakingly nurtured to bring tranquility into your space. Our trees
            represent centuries of tradition, elegance, and refinement.
          </p>
        </div>
      </section>

      <section className="image-text-section reverse" data-aos="fade-left">
        <div className="text">
          <h2>Handcrafted Luxury</h2>
          <p>
            Each creation is a living sculpture, carefully shaped by expert hands. We offer more than trees—we offer timeless beauty.
          </p>
        </div>
        <img
          src="https://bonsaimary.com/wp-content/uploads/2023/09/bonsai-history.jpg"
          alt="Luxury Bonsai"
        />
      </section>

      <section className="image-text-section" data-aos="zoom-in">
        <img
          src="https://wallpaperbat.com/img/90504-japanese-bonsai-wallpaper-top-free-japanese-bonsai-background.jpg"
          alt="Sustainable Practice"
        />
        <div className="text">
          <h2>Sustainable Elegance</h2>
          <p>
            Our commitment to sustainability ensures that elegance meets ethics. We use eco-conscious methods in every phase—from soil to pot.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
