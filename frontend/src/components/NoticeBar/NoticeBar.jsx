import React from 'react'
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import "./NoticeBar.css"

function NoticeBar() {
  return (
    <div className='annousment-wrapper'>
        <div className='annousment-pad'></div>
        <div className='annousment-text'><span>Free Shiping upto Purchase of 50$</span></div>
        <div className='annoument-list'>
            <ul>
                <li><a><XIcon style={{fontSize:"22px"}}/></a></li>
                <li><a><FacebookIcon style={{fontSize:"22px"}}/></a></li>
                <li><a><InstagramIcon style={{fontSize:"22px"}}/></a></li>
            </ul>
        </div>
    </div>
  )
}

export default NoticeBar