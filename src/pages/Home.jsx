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
        <div className="post-card" style={{ backgroundColor: isDarkMode ? '#222' : '#fff' }}>
            <div className="post-header">
                <img src="https://via.placeholder.com/40" alt="User Avatar" className="user-avatar"/>
                <span className="username">John Doe</span>
            </div>

            <h3 className="post-title">{data[currentIndex]?.title || 'No Title Available'}</h3>
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

            <div className="actions">
                <button 
                    className="btn btn-secondary" 
                    onClick={() => navigate(`/edit/${data[currentIndex]?.id}`)}
                >
                    <i className="bi bi-pencil"></i> Edit
                </button>
                <button 
                    className="btn btn-danger" 
                    onClick={() => setShowDeletePopup(true)}
                >
                    <i className="bi bi-trash"></i> Delete
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
