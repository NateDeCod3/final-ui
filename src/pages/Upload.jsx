import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'https://final-api-o03a.onrender.com';

const Upload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !imageUrl) {
            setMessage('All fields are required, including an image URL.');
            return;
        }

        const postData = {
            title,
            description,
            mediaUrl: imageUrl, // Use imageUrl as mediaUrl
        };

        try {
            await axios.post(`${BASE_URL}/post`, postData);
            setMessage('Post uploaded successfully!');
            setTitle('');
            setDescription('');
            setImageUrl('');
            navigate('/'); // Redirect to home page after successful upload
        } catch (err) {
            console.error('Error uploading post:', err);
            setMessage('Failed to upload post. Please try again.');
        }
    };

    return (
        <div className="upload p-4">
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
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        className="form-control"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Enter an image URL"
                        required
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/')} // Cancel button navigates to home page
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
