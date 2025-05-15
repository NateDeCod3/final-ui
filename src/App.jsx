import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Edit from './pages/Edit';
import Search from './pages/Search';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';

const App = () => {
    const [darkMode, setDarkMode] = useState(true); // Default to dark mode

    useEffect(() => {
        // Ensure dark mode is applied on initial load
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.body.classList.toggle('dark-mode', newDarkMode);
        document.body.classList.toggle('light-mode', !newDarkMode);
    };

    return (
        <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
            <Router>
                <Header toggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home isDarkMode={darkMode} />} />
                        <Route path="/upload" element={<Upload />} />
                        <Route path="/edit/:id" element={<Edit />} />
                        <Route path="/search" element={<Search />} />
                    </Routes>
                </div>
                <Footer isDarkMode={darkMode} />
            </Router>
        </div>
    );
};

export default App;
