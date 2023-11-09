import React from 'react';
import './footer.style.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Daraz_Logo.png/1024px-Daraz_Logo.png" alt="Company Logo" />
                </div>
                <div className="footer-links">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-social">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
            <div className="footer-copyright">
                &copy; 2023 Daraz Bangladesh. All Rights Reserved.
            </div>
        </footer>
    );
}

export default Footer;