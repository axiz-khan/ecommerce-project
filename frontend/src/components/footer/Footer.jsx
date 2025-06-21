import * as React from 'react';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CopyrightIcon from '@mui/icons-material/Copyright';
import './Footer.css';

function Footer() {
  const style = {
    headtStyle: {
      color: '#F2E1C1',
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
    },
    paraStyle: {
      color: '#C5C2B6',
      fontSize: '1rem',
      lineHeight: '1.8',
      textAlign: 'justify',
    },
    linkStyle: {
      color: '#F2E1C1',
      textDecoration: 'none',
      fontSize: '1rem',
    },
    iconStyle: {
      color: '#F2E1C1',
      fontSize: '2rem',
      transition: 'transform 0.3s ease',
    },
  };

  return (
    <div className='footer'>
      <div className='information'>
        <div className='About'>
          <Typography variant="h6" style={style.headtStyle}>About</Typography>
          <div className='Aboutsec-div'>
            <Typography style={style.paraStyle}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, maxime! Hic ut dolorem quos perferendis, veniam impedit quae blanditiis vitae fuga adipisci eum neque placeat eligendi quia ratione, harum natus.
            </Typography>
          </div>
        </div>

        <div className='Cat'>
          <Typography variant="h6" style={style.headtStyle}>Category</Typography>
          <ul>
            <li><a href='' style={style.linkStyle}>Manga</a></li>
            <li><a href='' style={style.linkStyle}>Merch</a></li>
            <li><a href='' style={style.linkStyle}>Action Figure</a></li>
          </ul>
        </div>

        <div className='Info'>
          <Typography variant="h6" style={style.headtStyle}>Information</Typography>
          <ul>
            <li><a href='' style={style.linkStyle}>About Us</a></li>
            <li><a href='' style={style.linkStyle}>Contact Us</a></li>
            <li><a href='' style={style.linkStyle}>Terms & Conditions</a></li>
            <li><a href='' style={style.linkStyle}>Return & Exchange</a></li>
            <li><a href='' style={style.linkStyle}>Shipping & Delivery</a></li>
            <li><a href='' style={style.linkStyle}>Privacy Policy</a></li>
          </ul>
        </div>

        <div className='Contact'>
          <Typography variant="h6" style={style.headtStyle}>Contact</Typography>
          <div id='infoAdd'>
            <Typography style={style.linkStyle}>XYZ, New Delhi, India</Typography>
            <Typography style={style.linkStyle}>Pin code - 1100055</Typography>
          </div>
          <Typography style={style.linkStyle}>+91 1234567890</Typography>
          <div className='social-icons'>
            <InstagramIcon style={style.iconStyle} />
            <FacebookIcon style={style.iconStyle} />
            <XIcon style={style.iconStyle} />
            <YouTubeIcon style={style.iconStyle} />
          </div>
        </div>
      </div>

      <div className='copy'>
        <Typography variant="body2" style={style.paraStyle}>
          Copyright <CopyrightIcon /> 2025 All rights reserved | Designed by Aziz
        </Typography>
      </div>
    </div>
  );
}

export default Footer;
