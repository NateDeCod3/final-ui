import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api';

const Upload = ({ isDarkMode }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [mediaType, setMediaType] = useState('image');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !mediaUrl) {
            setMessage('All fields are required.');
            return;
        }

        const postData = {
            title,
            description,
            mediaUrl,
            mediaType
        };

        try {
            await createPost(postData);
            setMessage('Post uploaded successfully!');
            setTitle('');
            setDescription('');
            setMediaUrl('');
            navigate('/');
        } catch (err) {
            console.error('Error uploading post:', err);
            setMessage('Failed to upload post. Please try again.');
        }
    };

    return (
        <div className={`upload ${isDarkMode ? 'dark-mode' : ''}`}>
            <h2 className="text-center mb-4">Upload a Post</h2>
            {message && <div className="alert alert-info text-center">{message}</div>}
            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '500px' }}>
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
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">Upload</button>
                </div>
            </form>
        </div>
    );
};

export default Upload;
