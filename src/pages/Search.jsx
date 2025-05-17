import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts, searchPosts, deletePost } from '../api';
import DeleteConfirmation from '../components/DeleteConfirmation';
import '../styles/Home.css'; // Make sure to import the CSS

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
        <div className={`search-page ${isDarkMode ? 'dark' : 'light'}`}>
            <h2 className={`search-title ${isDarkMode ? 'dark-text' : 'light-text'}`}>Search Posts</h2>
            <input
                type="text"
                className={`search-input ${isDarkMode ? 'dark-input' : ''}`}
                placeholder="Search posts..."
                value={keyword}
                onChange={handleSearch}
            />
            {loading && <div className={`loading-text ${isDarkMode ? 'dark-text' : 'light-text'}`}>Loading...</div>}
            {error && <div className="error-text">{error}</div>}
            <div className="results-container">
                {results.length > 0 ? (
                    results.map((post) => (
                        <div
                            key={post.id}
                            className={`post-card ${isDarkMode ? 'dark-card' : 'light-card'}`}
                        >
                            <h3 className={isDarkMode ? 'dark-text' : 'light-text'}>{post.title}</h3>
                            <p className={isDarkMode ? 'dark-text' : 'light-text'}>{post.description}</p>
                            {post.mediaUrl && <img src={post.mediaUrl} alt={post.title} className="post-image" />}
                            <div className="card-buttons">
                                <button 
                                    className="edit-button" 
                                    onClick={() => navigate(`/edit/${post.id}`)}
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button 
                                    className="delete-button" 
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
                    !loading && <div className={`no-results ${isDarkMode ? 'dark-text' : 'light-text'}`}>No results found.</div>
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
