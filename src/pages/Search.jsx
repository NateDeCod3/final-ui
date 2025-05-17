import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts, searchPosts, deletePost } from '../api';
import PostCard from '../components/PostCard';
import DeleteConfirmation from '../components/DeleteConfirmation';
import '../styles/Search.css';

const Search = ({ isDarkMode }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const searchTimeout = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInitialPosts = async () => {
            setLoading(true);
            try {
                const posts = await getPosts();
                setResults(posts);
            } catch (err) {
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialPosts();
        return () => {
            if (searchTimeout.current) clearTimeout(searchTimeout.current);
        };
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (searchTimeout.current) clearTimeout(searchTimeout.current);

        searchTimeout.current = setTimeout(async () => {
            if (!value.trim()) {
                const posts = await getPosts();
                setResults(posts);
                return;
            }

            setLoading(true);
            try {
                const searchResults = await searchPosts(value);
                setResults(searchResults);
            } catch (err) {
                console.error('Error searching:', err);
            } finally {
                setLoading(false);
            }
        }, 300);
    };

    const handleDelete = async (postId) => {
        try {
            await deletePost(postId);
            setResults(results.filter(post => post.id !== postId));
            setShowDeletePopup(false);
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

    return (
        <div className={`search-page ${isDarkMode ? 'dark' : 'light'}`}>
            <h2>Search Posts</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search posts..."
                className="search-input"
            />

            {loading && <div className="loading">Searching...</div>}

            <div className="search-results">
                {results.length > 0 ? (
                    results.map(post => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onDelete={() => {
                                setPostToDelete(post.id);
                                setShowDeletePopup(true);
                            }}
                            isDarkMode={isDarkMode}
                        />
                    ))
                ) : (
                    !loading && <div className="no-results">No results found</div>
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
