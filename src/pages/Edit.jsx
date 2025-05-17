import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '../api';
import '../styles/Edit.css';

const Edit = ({ isDarkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        mediaUrl: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const post = await getPostById(id);
                if (!post) throw new Error('Post not found');
                setFormData({
                    title: post.title,
                    description: post.description,
                    mediaUrl: post.mediaUrl
                });
            } catch (err) {
                setMessage(err.response?.data?.message || err.message || 'Failed to fetch post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

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
            await updatePost(id, formData);
            setMessage('Post updated successfully!');
            setTimeout(() => navigate('/'), 1000);
        } catch (err) {
            setMessage(err.response?.data?.message || err.message || 'Failed to update post');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className={`edit-page ${isDarkMode ? 'dark' : 'light'}`}>
            <h2>Edit Post</h2>
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
                    <button type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
