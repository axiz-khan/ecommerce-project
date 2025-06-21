import * as React from 'react'
import MobileNav from './NavBar'
import Nav from './Nav'
import Banner from '../Banner/Banner';
import NoticeBar from '../NoticeBar/NoticeBar';
import "./MainNav.css"

function MainNav() {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 700);
    React.useEffect(() => {
        const handleSize = () => {
            setIsMobile(window.innerWidth <= 700)
        }
        window.addEventListener("resize",handleSize);
        handleSize();

        return ()=>{
            window.removeEventListener("resize",handleSize);
        }
    },[]);
    return (
        <div>
            <div className='Navbar'>
            {isMobile?
            <MobileNav/>
            :<Nav/>
            }
            </div>
            
            <div className='Banner'>
                <Banner/>
            </div>
        </div>
    )
}

export default MainNav