import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteConfirmation from '../components/DeleteConfirmation';

const Search = ({ isDarkMode }) => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all posts by default
        const fetchAllPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/manansala/posts');
                setResults(response.data);
            } catch (err) {
                console.error('Error fetching all posts:', err);
                setError('Failed to fetch data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchAllPosts();
    }, []);

    const handleSearch = async (e) => {
        const searchKey = e.target.value;
        setKeyword(searchKey);

        if (!searchKey.trim()) {
            // If search input is empty, fetch all posts
            const response = await axios.get('http://localhost:8080/manansala/posts');
            setResults(response.data);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:8080/manansala/posts/search/${searchKey}`);
            setResults(response.data);
        } catch (err) {
            console.error('Error fetching search results:', err);
            setError('Failed to fetch search results. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:8080/manansala/posts/${postId}`);
            setResults(results.filter((post) => post.id !== postId)); // Remove the deleted post from the results
            setShowDeletePopup(false);
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

    return (
        <div className="search p-3">
            <h2 className="text-center mb-4">Search Posts</h2>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search..."
                value={keyword}
                onChange={handleSearch}
            />
            {loading && <div className="text-center">Loading...</div>}
            {error && <div className="text-center text-danger">{error}</div>}
            <div className="results">
                {results.length > 0 ? (
                    results.map((post) => (
                        <div
                            key={post.id}
                            className="post-card mb-3 p-3 border rounded"
                            style={{
                                backgroundColor: isDarkMode ? '#222' : '#FFFFFF',
                                color: isDarkMode ? '#FFF' : '#000',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                border: isDarkMode ? '1px solid #444' : '1px solid #DDD',
                                borderRadius: '10px',
                                padding: '15px',
                            }}
                        >
                            <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>{post.title}</h3>
                            <p style={{ marginBottom: '10px' }}>{post.description}</p>
                            {post.mediaUrl && (
                                <img
                                    src={post.mediaUrl}
                                    alt={post.title}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '10px',
                                    }}
                                />
                            )}
                            <div className="d-flex justify-content-end mt-3">
                                <button
                                    className="btn btn-secondary me-2"
                                    onClick={() => navigate(`/edit/${post.id}`)} // Navigate to the edit page
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: isDarkMode ? '#FFFFFF' : '#000000', // Black in light mode
                                    }}
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        setPostToDelete(post.id);
                                        setShowDeletePopup(true);
                                    }} // Trigger delete confirmation popup
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: isDarkMode ? '#FFFFFF' : '#000000', // Black in light mode
                                    }}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <div className="text-center">No results found.</div>
                )}
            </div>

            {showDeletePopup && (
                <DeleteConfirmation
                    postId={postToDelete}
                    onConfirm={handleDelete} // Handle delete functionality
                    onCancel={() => setShowDeletePopup(false)} // Close the popup
                />
            )}
        </div>
    );
};

export default Search;
