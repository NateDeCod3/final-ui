import React, { useState } from "react";

const PostCard = ({ post, onDelete, isDarkMode }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="post-card" style={{ backgroundColor: isDarkMode ? '#222' : '#fff' }}>
            <div className="post-header">
                <img src="https://via.placeholder.com/40" alt="User Avatar" className="user-avatar"/>
                <span className="username">John Doe</span>
            </div>

            <h3 className="post-title">{post.title}</h3>
            <p className="post-description">
                {expanded ? post.description : post.description.slice(0, 100)}
            </p>

            {post.description.length > 100 && (
                <button 
                    className="btn btn-secondary" 
                    onClick={() => setExpanded(!expanded)}
                    style={{ alignSelf: 'flex-start' }}
                >
                    {expanded ? "Show Less" : "Expand"}
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
                    className="btn btn-secondary" 
                    onClick={() => window.location.href = `/edit/${post.id}`}
                >
                    <i className="bi bi-pencil-square"></i> Edit
                </button>
                <button 
                    className="btn btn-danger" 
                    onClick={() => onDelete(post.id)}
                >
                    <i className="bi bi-trash-fill"></i> Delete
                </button>
            </div>
        </div>
    );
};

export default PostCard;
