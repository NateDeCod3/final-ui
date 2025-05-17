import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleDarkMode, isDarkMode }) => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <button
                className="logo"
                onClick={toggleDarkMode}
                style={{ color: isDarkMode ? '#1E90FF' : '#0000FF' }}
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
        </header>
    );
};

export default Header;
