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

    const renderMedia = (post) => {
        if (!post.mediaUrl) {
            return (
                <div className="image-container">
                    <img
                        src="https://placehold.co/600x400?text=No+Media"
                        alt="Placeholder"
                    />
                </div>
            );
        }

        // Check if it's a YouTube URL
        const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const youtubeMatch = post.mediaUrl.match(youtubeRegex);

        if (youtubeMatch) {
            const videoId = youtubeMatch[1];
            return (
                <div className="video-container">
                    <span className="media-type">Video</span>
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                </div>
            );
        }

        // Check if it's a direct video link
        const videoExtensions = ['.mp4', '.webm', '.ogg'];
        const isVideo = videoExtensions.some(ext => post.mediaUrl.toLowerCase().endsWith(ext));

        if (isVideo) {
            return (
                <div className="video-container">
                    <span className="media-type">Video</span>
                    <video controls style={{ width: '100%' }}>
                        <source src={post.mediaUrl} type={`video/${post.mediaUrl.split('.').pop()}`} />
                        Your browser does not support the video tag.
                    </video>
                </div>
            );
        }

        // Default to image
        return (
            <div className="image-container">
                <span className="media-type">Image</span>
                <img
                    src={post.mediaUrl}
                    alt={post.title || 'Post media'}
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/600x400?text=No+Image';
                    }}
                />
            </div>
        );
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

    const currentPost = data[currentIndex];

    return (
        <div className="content-container" style={{ backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }}>
            <div className="post-content">
                <div className="action-buttons">
                    <button 
                        onClick={() => navigate(`/edit/${currentPost?.id}`)}
                        title="Edit"
                    >
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button 
                        onClick={() => setShowDeletePopup(true)}
                        title="Delete"
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>

                <h3 className="post-title">{currentPost?.title || 'No Title Available'}</h3>
                <p className="post-description">
                    {currentPost?.description || 'No Description Available'}
                </p>

                {renderMedia(currentPost)}

                <div className="navigation-buttons">
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
                    postId={currentPost?.id}
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeletePopup(false)}
                />
            )}
        </div>
    );
};

export default Home;
