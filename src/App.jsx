import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = ({ isDarkMode }) => {
    const navigate = useNavigate();

    return (
        <footer className="footer">
            <button
                className="footer-icon"
                onClick={() => navigate('/')}
                style={{
                    color: isDarkMode ? '#1E90FF' : '#0000FF',
                    fontSize: '1.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
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
                    color: isDarkMode ? '#1E90FF' : '#0000FF',
                    fontSize: '1.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
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
