import React, { useState } from "react";

const PostCard = ({ post, onDelete }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="post-card">
            <div className="post-header">
                <img src="https://via.placeholder.com/40" alt="User Avatar" className="user-avatar"/>
                <span className="username">John Doe</span>
            </div>

            <h3 className="post-title">{post.title}</h3>
            <p className="post-description">
                {expanded ? post.description : post.description.slice(0, 100)}
            </p>

            {post.description.length > 100 && (
                <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
                    {expanded ? "Show Less" : "Expand"}
                </button>
            )}

            <div className="image-container">
                <img src={post.mediaUrl || "https://via.placeholder.com/400x300"} alt="Post media" className="post-image" />
            </div>

            <div className="actions">
                <button onClick={() => window.location.href = `/edit/${post.id}`}>
                    <i className="bi bi-pencil-square"></i> Edit
                </button>
                <button onClick={() => onDelete(post.id)}>
                    <i className="bi bi-trash-fill"></i> Delete
                </button>
            </div>
        </div>
    );
};

export default PostCard;
