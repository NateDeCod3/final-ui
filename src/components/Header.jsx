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
                }}
            >
                Z
            </button>
            <button
                className="upload-btn"
                onClick={() => navigate('/upload')}
            >
                +
            </button>
        </header>
    );
};

export default Header;
