import React from 'react';
import './navbar.style.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-logo">
                    <img src="https://logos-world.net/wp-content/uploads/2022/05/Daraz-Emblem.png" alt="Company Logo" />
                </div>
                <div className="navbar-links">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#products">Products</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
