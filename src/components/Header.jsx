import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ toggleDarkMode, isDarkMode }) => {
    const navigate = useNavigate();

    return (
        <header className={`header ${isDarkMode ? 'dark' : 'light'}`}>
            <button className="logo" onClick={toggleDarkMode}>
                Z
            </button>
            <button className="upload-btn" onClick={() => navigate('/upload')}>
                +
            </button>
        </header>
    );
};

export default Header;
