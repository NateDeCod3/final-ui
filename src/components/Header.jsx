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
                height: '60px',
            }}
        >
            <button
                className="logo"
                onClick={toggleDarkMode}
                style={{
                    color: isDarkMode ? '#1E90FF' : '#0000FF',
                    fontWeight: 'bold',
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
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    padding: 0,
                }}
            >
                +
            </button>
        </header>
    );
};

export default Header;
