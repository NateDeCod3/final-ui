import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'https://final-api-o03a.onrender.com';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch the post data by ID
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/posts/${id}`);
                const { title, description, mediaUrl } = response.data;
                setTitle(title);
                setDescription(description);
                setMediaUrl(mediaUrl);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to fetch post. Please try again.');
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

        const updatedPost = { title, description, mediaUrl };

        try {
            await axios.put(`${BASE_URL}/posts/${id}`, updatedPost);
            setMessage('Post updated successfully!');
            setTimeout(() => navigate('/'), 1000); // Redirect to home after 1 second
        } catch (err) {
            console.error('Error updating post:', err);
            setMessage('Failed to update post. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/'); // Redirect to home page
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    return (
        <div className="edit p-4">
            <h2 className="text-center mb-4">Edit Post</h2>
            {message && <div className="alert alert-info text-center">{message}</div>}
            <form onSubmit={handleSave} className="mx-auto" style={{ maxWidth: '500px' }}>
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
                    <label htmlFor="mediaUrl" className="form-label">Image Link</label>
                    <input
                        type="text"
                        id="mediaUrl"
                        className="form-control"
                        value={mediaUrl}
                        onChange={(e) => setMediaUrl(e.target.value)}
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
