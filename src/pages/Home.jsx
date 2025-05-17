import React, { useState, useEffect } from 'react';
import { getPosts, deletePost } from '../api';
import DeleteConfirmation from '../components/DeleteConfirmation';

const Home = ({ isDarkMode }) => {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const posts = await getPosts();
                setData(posts);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (postId) => {
        try {
            await deletePost(postId);
            setData(data.filter((post) => post.id !== postId));
            setShowDeletePopup(false);
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

    if (data.length === 0) return <div className="no-posts">No posts available</div>;

    const currentPost = data[currentIndex];
    const isVideo = currentPost.mediaUrl?.includes('youtube.com') || currentPost.mediaUrl?.includes('youtu.be');

    return (
        <div className={`home-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="post-content">
                <div className="post-header">
                    <img src="https://via.placeholder.com/40" alt="User" className="user-avatar" />
                    <span className="username">John Doe</span>
                </div>

                <div className="post-text-content">
                    <h3 className="post-title">{currentPost.title}</h3>
                    <p className="post-description">{currentPost.description}</p>
                </div>

                <div className="media-container">
                    {isVideo ? (
                        <div className="video-embed">
                            <iframe
                                src={`https://www.youtube.com/embed/${currentPost.mediaUrl.split('v=')[1]}`}
                                allowFullScreen
                                title="Embedded youtube"
                            />
                        </div>
                    ) : (
                        <img
                            src={currentPost.mediaUrl || "https://placehold.co/600x400"}
                            alt="Post content"
                            className="post-image"
                            onError={(e) => {
                                e.target.src = 'https://placehold.co/600x400?text=No+Image';
                            }}
                        />
                    )}
                </div>

                <div className="action-buttons">
                    <button 
                        className={`edit-btn ${isDarkMode ? 'dark' : 'light'}`}
                        onClick={() => window.location.href = `/edit/${currentPost.id}`}
                    >
                        <i className="bi bi-pencil-square"></i> Edit
                    </button>
                    <button 
                        className={`delete-btn ${isDarkMode ? 'dark' : 'light'}`}
                        onClick={() => setShowDeletePopup(true)}
                    >
                        <i className="bi bi-trash-fill"></i> Delete
                    </button>
                </div>
            </div>

            {showDeletePopup && (
                <DeleteConfirmation
                    postId={currentPost.id}
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeletePopup(false)}
                />
            )}
        </div>
    );
};

export default Home;
