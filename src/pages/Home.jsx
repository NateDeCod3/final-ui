import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts, deletePost } from '../api';
import DeleteConfirmation from '../components/DeleteConfirmation';
import '../styles/Home.css';

const Home = ({ isDarkMode }) => {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
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
            setDeleteSuccess(true);
            setTimeout(() => setDeleteSuccess(false), 3000);
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

    if (loading) {
        return <div className="loading text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    if (data.length === 0) {
        return (
            <div className={`no-data ${isDarkMode ? 'dark-mode' : ''}`}>
                <div className="no-data-content">
                    <p>No Data Available</p>
                </div>
            </div>
        );
    }

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
        <div className={`content-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="post-content">
                <div className="post-header">
                    <h3 className="post-title">{data[currentIndex]?.title || 'No Title Available'}</h3>
                    <div className="action-icons">
                        <i 
                            className="bi bi-pencil" 
                            onClick={() => navigate(`/edit/${data[currentIndex]?.id}`)}
                        ></i>
                        <i 
                            className="bi bi-trash" 
                            onClick={() => setShowDeletePopup(true)}
                        ></i>
                    </div>
                </div>
                
                <p className="post-description">
                    {data[currentIndex]?.description || 'No Description Available'}
                </p>

                <div className="image-container">
                    <img
                        src={getImageSource()}
                        alt={data[currentIndex]?.title || 'Placeholder'}
                        onError={(e) => {
                            e.target.src = 'https://placehold.co/600x400?text=No+Image';
                        }}
                    />
                    <button className="overlay-btn left" onClick={handlePrevious}>
                        &#8592;
                    </button>
                    <button className="overlay-btn right" onClick={handleNext}>
                        &#8594;
                    </button>
                </div>
            </div>

            {showDeletePopup && (
                <DeleteConfirmation
                    postId={data[currentIndex]?.id}
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeletePopup(false)}
                />
            )}

            {deleteSuccess && (
                <div className="delete-success-message">
                    Post deleted successfully!
                </div>
            )}
        </div>
    );
};

export default Home;
