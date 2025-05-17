import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts, searchPosts, deletePost } from '../api';
import DeleteConfirmation from '../components/DeleteConfirmation';
import '../styles/Search.css';

const Search = ({ isDarkMode }) => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
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
            setDeleteSuccess(true);
            setTimeout(() => setDeleteSuccess(false), 3000);
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

    return (
        <div className={`search-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <h2 className="search-title">Search Posts</h2>
            <input
                type="text"
                className="search-input"
                placeholder="Search posts..."
                value={keyword}
                onChange={handleSearch}
            />
            
            {loading && <div className="loading-message">Loading...</div>}
            {error && <div className="error-message">{error}</div>}
            
            <div className="search-results">
                {results.length > 0 ? (
                    results.map((post) => (
                        <div key={post.id} className="search-result-card">
                            <div className="result-header">
                                <h3 className="result-title">{post.title}</h3>
                                <div className="action-icons">
                                    <i 
                                        className="bi bi-pencil" 
                                        onClick={() => navigate(`/edit/${post.id}`)}
                                    ></i>
                                    <i 
                                        className="bi bi-trash" 
                                        onClick={() => {
                                            setPostToDelete(post.id);
                                            setShowDeletePopup(true);
                                        }}
                                    ></i>
                                </div>
                            </div>
                            <p className="result-description">{post.description}</p>
                            {post.mediaUrl && (
                                <div className="result-media">
                                    <img 
                                        src={post.mediaUrl} 
                                        alt={post.title} 
                                        onError={(e) => {
                                            e.target.src = 'https://placehold.co/600x400?text=No+Image';
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    !loading && <div className="no-results">No results found.</div>
                )}
            </div>

            {showDeletePopup && (
                <DeleteConfirmation 
                    postId={postToDelete} 
                    onConfirm={handleDelete} 
                    onCancel={() => setShowDeletePopup(false)} 
                />
            )}

            {deleteSuccess && (
                <div className="delete-success-message">
                    Post deleted successfully!
                </div>
            )}
        </div>
    );
};

export default Search;
