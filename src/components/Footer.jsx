import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = ({ isDarkMode }) => {
    const navigate = useNavigate();

    return (
        <footer
            className="footer"
            style={{
                background: isDarkMode
                    ? 'linear-gradient(to right, #001f3f, #003366)'
                    : 'linear-gradient(to right, #87CEFA, #4682B4)',
                height: '60px', // Consistent height
            }}
        >
            <button
                className="footer-icon"
                onClick={() => navigate('/')}
                style={{
                    color: isDarkMode ? '#1E90FF' : '#0000FF', // Same color as "Z"
                    fontSize: '1.5rem',
                }}
                onMouseEnter={(e) => (e.target.style.color = isDarkMode ? '#FFFFFF' : '#00008B')}
                onMouseLeave={(e) => (e.target.style.color = isDarkMode ? '#1E90FF' : '#0000FF')}
            >
                <i className="bi bi-house-fill"></i>
            </button>
            <button
                className="footer-icon"
                onClick={() => navigate('/search')}
                style={{
                    color: isDarkMode ? '#1E90FF' : '#0000FF', // Match home icon color in light mode
                    fontSize: '1.5rem',
                }}
                onMouseEnter={(e) => (e.target.style.color = isDarkMode ? '#FFFFFF' : '#00008B')}
                onMouseLeave={(e) => (e.target.style.color = isDarkMode ? '#1E90FF' : '#0000FF')}
            >
                <i className="bi bi-search"></i>
            </button>
        </footer>
    );
};

export default Footer;
