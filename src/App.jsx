import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Edit from './pages/Edit';
import Search from './pages/Search';
import './styles/App.css';
import './styles/global.css';
import './styles/theme.css';

const App = () => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
        document.body.classList.toggle('light-mode', !darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <Router>
            <div className="app-container">
                <Header toggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home isDarkMode={darkMode} />} />
                        <Route path="/upload" element={<Upload isDarkMode={darkMode} />} />
                        <Route path="/edit/:id" element={<Edit isDarkMode={darkMode} />} />
                        <Route path="/search" element={<Search isDarkMode={darkMode} />} />
                    </Routes>
                </main>
                <Footer isDarkMode={darkMode} />
            </div>
        </Router>
    );
};

export default App;
