import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api';
import '../styles/Upload.css';

const Upload = ({ isDarkMode }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        mediaUrl: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.mediaUrl) {
            setMessage('All fields are required');
            return;
        }

        try {
            await createPost(formData);
            setMessage('Post created successfully!');
            setFormData({ title: '', description: '', mediaUrl: '' });
            setTimeout(() => navigate('/'), 1000);
        } catch (err) {
            setMessage(err.response?.data?.message || err.message || 'Failed to create post');
        }
    };

    return (
        <div className={`upload-page ${isDarkMode ? 'dark' : 'light'}`}>
            <h2>Upload Post</h2>
            {message && (
                <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mediaUrl">Media URL</label>
                    <input
                        type="text"
                        id="mediaUrl"
                        name="mediaUrl"
                        value={formData.mediaUrl}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/')}>Cancel</button>
                    <button type="submit">Upload</button>
                </div>
            </form>
        </div>
    );
};

export default Upload;
