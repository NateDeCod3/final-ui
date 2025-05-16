import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteConfirmation from '../components/DeleteConfirmation';

const BASE_URL = 'https://final-api-o03a.onrender.com';

const Home = ({ isDarkMode }) => {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [showCaptionPopup, setShowCaptionPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/posts`);
                setData(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data. Please check the API endpoint or server.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`${BASE_URL}/posts/${postId}`);
            setData(data.filter((post) => post.id !== postId));
            setShowDeletePopup(false);
            window.location.reload(); // Refresh the page after deletion
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    if (data.length === 0) {
        return <div className="text-center">No Data Available</div>;
    }

    return (
        <div className="content-container">
            <div className="content-header d-flex justify-content-between align-items-center">
                <div>
                    <h2 style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                        {data[currentIndex]?.title || 'No Title Available'}
                    </h2>
                    <p style={{ marginTop: '5px', color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                        {data[currentIndex]?.description || 'No Description Available'}
                    </p>
                </div>
                <div>
                    <button
                        className="btn btn-secondary me-2"
                        onClick={() => navigate(`/edit/${data[currentIndex]?.id}`)} // Navigate to the edit page
                        style={{
                            background: 'none',
                            border: 'none',
                            color: isDarkMode ? '#FFFFFF' : '#000000', // Black in light mode
                        }}
                    >
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => setShowDeletePopup(true)} // Trigger delete confirmation popup
                        style={{
                            background: 'none',
                            border: 'none',
                            color: isDarkMode ? '#FFFFFF' : '#000000', // Black in light mode
                        }}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>
            <div className="image-container">
                <img
                    src={data[currentIndex]?.mediaUrl || 'https://via.placeholder.com/500'}
                    alt={data[currentIndex]?.title || 'Placeholder'}
                    className="img-fluid rounded"
                    style={{ maxHeight: '300px', objectFit: 'cover' }}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/500'; // Fallback image
                    }}
                />
            </div>
            <div className="image-container position-relative">
                <button
                    className="btn btn-primary overlay-btn left"
                    onClick={handlePrevious}
                >
                    &#8592;
                </button>
                <button
                    className="btn btn-primary overlay-btn right"
                    onClick={handleNext}
                >
                    &#8594;
                </button>
            </div>

            {showDeletePopup && (
                <DeleteConfirmation
                    postId={data[currentIndex]?.id}
                    onConfirm={handleDelete} // Handle delete functionality
                    onCancel={() => setShowDeletePopup(false)} // Close the popup
                />
            )}
        </div>
    );
};

export default Home;
