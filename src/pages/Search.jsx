import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts, searchPosts, deletePost } from '../api';
import DeleteConfirmation from '../components/DeleteConfirmation';

const Search = ({ isDarkMode }) => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const searchTimeout = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllPosts = async () => {
            setLoading(true);
            try {
                const posts = await getPosts();
                setResults(posts);
            } catch (err) {
                console.error('Error fetching all posts:', err);
                setError('Failed to fetch data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchAllPosts();
        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, []);

    const handleSearch = async (e) => {
        const searchKey = e.target.value;
        setKeyword(searchKey);

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(async () => {
            if (!searchKey.trim()) {
                const posts = await getPosts();
                setResults(posts);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const searchResults = await searchPosts(searchKey);
                setResults(searchResults);
            } catch (err) {
                console.error('Error fetching search results:', err);
                setError('Failed to fetch search results. Please try again.');
            } finally {
                setLoading(false);
            }
        }, 300);
    };

    const handleDelete = async (postId) => {
        try {
            await deletePost(postId);
            setResults(results.filter((post) => post.id !== postId));
            setShowDeletePopup(false);
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

    return (
        <div className={`search p-3 ${isDarkMode ? 'dark-mode' : ''}`}>
            <h2 className="text-center mb-4">Search Posts</h2>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search posts..."
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
                                border: isDarkMode ? '1px solid #444' : '1px solid #DDD',
                            }}
                        >
                            <h3>{post.title}</h3>
                            <p>{post.description}</p>
                            {post.mediaUrl && <img src={post.mediaUrl} alt={post.title} style={{ maxWidth: '100%' }} />}
                            <div className="d-flex justify-content-end mt-3">
                                <button 
                                    className="btn btn-secondary me-2" 
                                    onClick={() => navigate(`/edit/${post.id}`)}
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => { 
                                        setPostToDelete(post.id); 
                                        setShowDeletePopup(true); 
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
                    onConfirm={handleDelete} 
                    onCancel={() => setShowDeletePopup(false)} 
                />
            )}
        </div>
    );
};

export default Search;
