import React, { useState } from "react";
import "../styles/Home.css";

const PostCard = ({ post, onDelete, isDarkMode }) => {
    const [expanded, setExpanded] = useState(false);

    // Extract YouTube ID if URL is provided
    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const isVideo = post.mediaUrl?.includes('youtube.com') || post.mediaUrl?.includes('youtu.be');
    const videoId = isVideo ? getYouTubeId(post.mediaUrl) : null;

    return (
        <div 
            className={`post-card ${isDarkMode ? "dark-mode" : ""}`}
            style={{ 
                backgroundColor: isDarkMode ? '#222' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
            }}
        >
            <div className="post-header">
                <img 
                    src="https://via.placeholder.com/40" 
                    alt="User Avatar" 
                    className="user-avatar"
                />
                <span className="username">John Doe</span>
            </div>

            <div className="post-text-content">
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
            </div>

            <div className="media-container">
                {isVideo && videoId ? (
                    <div className="video-embed">
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
                    className={`action-btn edit-btn ${isDarkMode ? 'dark' : 'light'}`}
                    onClick={() => window.location.href = `/edit/${post.id}`}
                >
                    <i className="bi bi-pencil-square"></i> Edit
                </button>
                <button 
                    className={`action-btn delete-btn ${isDarkMode ? 'dark' : 'light'}`}
                    onClick={() => onDelete(post.id)}
                >
                    <i className="bi bi-trash-fill"></i> Delete
                </button>
            </div>
        </div>
    );
};

export default PostCard;
