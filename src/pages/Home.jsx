import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts, deletePost } from '../api';
import DeleteConfirmation from '../components/DeleteConfirmation';

const Home = ({ isDarkMode }) => {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const posts = await getPosts();
                setData(posts);
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
            await deletePost(postId);
            setData(data.filter((post) => post.id !== postId));
            setShowDeletePopup(false);
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

    // Fallback image source
    const getImageSource = () => {
        const defaultImage = 'https://placehold.co/600x400?text=No+Image';
        try {
            if (data[currentIndex]?.mediaUrl) {
                return data[currentIndex].mediaUrl;
            }
            return defaultImage;
        } catch {
            return defaultImage;
        }
    };

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
                        onClick={() => navigate(`/edit/${data[currentIndex]?.id}`)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: isDarkMode ? '#FFFFFF' : '#000000',
                        }}
                    >
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => setShowDeletePopup(true)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: isDarkMode ? '#FFFFFF' : '#000000',
                        }}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>
            <div className="image-container">
                <img
                    src={getImageSource()}
                    alt={data[currentIndex]?.title || 'Placeholder'}
                    className="img-fluid rounded"
                    style={{ maxHeight: '300px', objectFit: 'cover' }}
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/600x400?text=No+Image';
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
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeletePopup(false)}
                />
            )}
        </div>
    );
};

export default Home;
