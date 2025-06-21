import * as React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CategoryIcon from '@mui/icons-material/Category';
import Link from '@mui/material/Link';
import "./Menu.css"
import { Typography } from '@mui/material';


function MainMenu({select="home"}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
   


    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box id="main-main">
            <Box id="main">
                <Box>
                    <Button
                        id="button"
                        type='button'
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}

                    >
                        <CategoryIcon />Category
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Box>
                <Link href="#" underline="none" >
                    {<Typography className={select === "home" ?"select":"css"}>Home</Typography>}
                </Link>
                <Link href="#" underline="none" >
                    {<Typography className={select === "shop" ?"select":"css"}>Shop</Typography>}
                </Link>
                <Link href="#" underline="none" >
                    {<Typography className={select === "product" ?"select":"css"}>Product</Typography>}
                </Link>
                <Link href="#" underline="none" >
                    {<Typography className={select === "about" ?"select":"css"}>About</Typography>}
                </Link>
                <Link href="#" underline="none" >
                    {<Typography className={select === "contact" ?"select":"css"}>Contact</Typography>}
                </Link>


            </Box>
        </Box>
    )
}

export default MainMenu