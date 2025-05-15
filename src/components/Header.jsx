import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleDarkMode, isDarkMode }) => {
    const navigate = useNavigate();

    return (
        <header
            className="header"
            style={{
                background: isDarkMode
                    ? 'linear-gradient(to right, #001f3f, #003366)'
                    : 'linear-gradient(to right, #87CEFA, #4682B4)',
                height: '60px', // Consistent height
                position: 'relative', // For positioning the watermark
            }}
        >
            <button
                className="logo"
                onClick={toggleDarkMode}
                style={{
                    color: isDarkMode ? '#1E90FF' : '#0000FF', // Brighter blue in light mode
                    fontWeight: 'bold', // Thicker "Z"
                    fontSize: '1.8rem',
                }}
                onMouseEnter={(e) => (e.target.style.color = isDarkMode ? '#FFFFFF' : '#000000')}
                onMouseLeave={(e) => (e.target.style.color = isDarkMode ? '#1E90FF' : '#0000FF')}
            >
                Z
            </button>
            <button
                className="upload-btn"
                onClick={() => navigate('/upload')}
                style={{
                    backgroundColor: 'white',
                    color: '#000',
                    fontSize: '1.5rem',
                    borderRadius: '50%',
                    padding: '10px 15px',
                    border: 'none',
                }}
            >
                +
            </button>
            {/* Watermark */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '5px',
                    right: '10px',
                    fontSize: '0.8rem',
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                    pointerEvents: 'none', // Ensure it doesn't interfere with interactions
                }}
            >
                Z
            </div>
        </header>
    );
};

export default Header;
