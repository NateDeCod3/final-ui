import React, { useState } from "react";
import "../styles/Home.css"; 

const PostCard = ({ post, onDelete, isDarkMode }) => {
    const [expanded, setExpanded] = useState(false);

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

            <div className="image-container">
                <img 
                    src={post.mediaUrl || "https://placehold.co/600x400"} 
                    alt="Post media" 
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/600x400?text=No+Image';
                    }}
                />
            </div>

            <div className="actions">
                <button 
                    className="btn btn-edit" 
                    onClick={() => window.location.href = `/edit/${post.id}`}
                >
                    <i className="bi bi-pencil-square"></i> Edit
                </button>
                <button 
                    className="btn btn-delete" 
                    onClick={() => onDelete(post.id)}
                >
                    <i className="bi bi-trash-fill"></i> Delete
                </button>
            </div>
        </div>
    );
};

export default PostCard;
