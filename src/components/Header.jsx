import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleDarkMode, isDarkMode }) => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <button
                className="logo"
                onClick={toggleDarkMode}
                style={{
                    color: isDarkMode ? '#1E90FF' : '#0000FF',
                    fontWeight: 'bold',
                    fontSize: '1.8rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.target.style.color = isDarkMode ? '#FFFFFF' : '#000000')}
                onMouseLeave={(e) => (e.target.style.color = isDarkMode ? '#1E90FF' : '#0000FF')}
            >
                Z
            </button>
            <button
                className="upload-btn"
                onClick={() => navigate('/upload')}
            >
                +
            </button>
            <div
                style={{
                    position: 'absolute',
                    bottom: '5px',
                    right: '10px',
                    fontSize: '0.8rem',
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                    pointerEvents: 'none',
                }}
            >
                Z
            </div>
        </header>
    );
};

export default Header;
