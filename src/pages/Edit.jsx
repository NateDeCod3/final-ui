import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '../api';

const Edit = ({ isDarkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [mediaType, setMediaType] = useState('image');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                setError(null);
                const post = await getPostById(id);
                if (!post) {
                    throw new Error('Post not found');
                }
                setTitle(post.title);
                setDescription(post.description);
                setMediaUrl(post.mediaUrl);
                setMediaType(post.mediaType || 'image');
            } catch (err) {
                console.error('Error fetching post:', err);
                setError(err.response?.data?.message || err.message || 'Failed to fetch post. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleSave = async (e) => {
        e.preventDefault();

        if (!title || !description || !mediaUrl) {
            setMessage('All fields are required.');
            return;
        }

        const updatedPost = { title, description, mediaUrl, mediaType };

        try {
            setMessage('');
            await updatePost(id, updatedPost);
            setMessage('Post updated successfully!');
            setTimeout(() => navigate('/'), 1000);
        } catch (err) {
            console.error('Error updating post:', err);
            setMessage(err.response?.data?.message || err.message || 'Failed to update post. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    return (
        <div className={`edit p-4 ${isDarkMode ? 'dark-mode' : ''}`}>
            <h2 className="text-center mb-4">Edit Post</h2>
            {message && (
                <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} text-center`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSave} className="mx-auto" style={{ maxWidth: '500px' }}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        className="form-control"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter post description"
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="mediaType" className="form-label">Media Type</label>
                    <select
                        id="mediaType"
                        className="form-control"
                        value={mediaType}
                        onChange={(e) => setMediaType(e.target.value)}
                    >
                        <option value="image">Image</option>
                        <option value="video">Video (YouTube or direct link)</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="mediaUrl" className="form-label">
                        {mediaType === 'image' ? 'Image URL' : 'Video URL'}
                    </label>
                    <input
                        type="text"
                        id="mediaUrl"
                        className="form-control"
                        value={mediaUrl}
                        onChange={(e) => setMediaUrl(e.target.value)}
                        placeholder={mediaType === 'image' ? 'Paste image URL here' : 'Paste YouTube or video URL here'}
                        required
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
