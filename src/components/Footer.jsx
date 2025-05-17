import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = ({ isDarkMode }) => {
    const navigate = useNavigate();

    return (
        <footer className={`footer ${isDarkMode ? 'dark' : 'light'}`}>
            <button className="footer-icon" onClick={() => navigate('/')}>
                <i className="bi bi-house-fill"></i>
            </button>
            <button className="footer-icon" onClick={() => navigate('/search')}>
                <i className="bi bi-search"></i>
            </button>
        </footer>
    );
};

export default Footer;
