import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PostCard.css';

const PostCard = ({ post, onDelete, isDarkMode }) => {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const isVideo = post.mediaUrl?.includes('youtube.com') || post.mediaUrl?.includes('youtu.be');
    const videoId = isVideo ? getYouTubeId(post.mediaUrl) : null;

    return (
        <div className={`post-card ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="post-header">
                <img 
                    src="https://via.placeholder.com/40" 
                    alt="User Avatar" 
                    className="user-avatar"
                />
                <span className="username">John Doe</span>
            </div>

            <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-description">
                    {expanded ? post.description : `${post.description.slice(0, 100)}${post.description.length > 100 ? '...' : ''}`}
                </p>
                {post.description.length > 100 && (
                    <button 
                        className="expand-btn" 
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? "Show Less" : "Read More"}
                    </button>
                )}

                <div className="media-container">
                    {isVideo && videoId ? (
                        <div className="video-embed">
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}`}
                                allowFullScreen
                                title="Embedded youtube video"
                            />
                        </div>
                    ) : (
                        <img 
                            src={post.mediaUrl || "https://placehold.co/600x400"} 
                            alt="Post media" 
                            className="post-image"
                            onError={(e) => {
                                e.target.src = 'https://placehold.co/600x400?text=No+Image';
                            }}
                        />
                    )}
                </div>

                <div className="post-actions">
                    <button 
                        className={`action-btn ${isDarkMode ? 'dark' : 'light'}`}
                        onClick={() => navigate(`/edit/${post.id}`)}
                    >
                        <i className="bi bi-pencil-square"></i> Edit
                    </button>
                    <button 
                        className={`action-btn ${isDarkMode ? 'dark' : 'light'}`}
                        onClick={() => onDelete(post.id)}
                    >
                        <i className="bi bi-trash-fill"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
