import React from 'react';
import { FaFacebook, FaTiktok, FaLinkedin, FaInstagram } from 'react-icons/fa';
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-main">
                <div className="social-icons">
                    <a href="#" className="social-icon facebook">
                        <FaFacebook size={35} />
                    </a>
                    <a href="#" className="social-icon tiktok">
                        <FaTiktok size={35} />
                    </a>
                    <a href="#" className="social-icon linkedin">
                        <FaLinkedin size={35} />
                    </a>
                    <a href="#" className="social-icon instagram">
                        <FaInstagram size={35} />
                    </a>
                </div>

                <nav className="footer-nav">
                    <ul>
                        <li><a href="#">Quizes</a></li>
                        <li><a href="#">Mission</a></li>
                        <li><a href="#">Articles</a></li>
                        <li><a href="#">Contacts</a></li>
                    </ul>
                </nav>
            </div>

            <div className="footer-copyright">
                copyright ©2025 Designed By Teodora Techie
            </div>
        </footer>
    );
};

export default Footer;