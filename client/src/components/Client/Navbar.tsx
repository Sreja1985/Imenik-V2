import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import the icons

function Navbar() {
    const [clicked, setClicked] = useState(false);   

    return (
        <nav className='NavbarItems'>
            <Link to='/'>
                {/*<img className='navbar__logo' alt='Životinjsko Carstvo' src={require('../Assets/logo.png')} />*/}
            </Link>

            <div className='menu__icons' onClick={() => {
                setClicked(!clicked);
            }}>
                {/* Use react-icons instead of <i> */}
                {clicked ? <FaTimes /> : <FaBars />}
            </div>

            <ul className={clicked ? 'nav__menu active' : 'nav__menu'}>
                {MenuItems.map((item, index) => {
                    return(
                        <li key={index}>
                            <NavLink 
                                to={item.url} 
                                className={({ isActive }) => 
                                    'nav__links' + (isActive ? " activated" : "")
                                }
                                onClick={() => setClicked(false)} // Close menu after click
                            >
                                {item.title}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Navbar;
