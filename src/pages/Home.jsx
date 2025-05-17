import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts, deletePost } from '../api';
import PostCard from '../components/PostCard';
import DeleteConfirmation from '../components/DeleteConfirmation';
import '../styles/Home.css';

const Home = ({ isDarkMode }) => {
    const [posts, setPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (err) {
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {
        try {
            await deletePost(postId);
            setPosts(posts.filter(post => post.id !== postId));
            setShowDeletePopup(false);
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (posts.length === 0) return <div className="no-posts">No posts available</div>;

    return (
        <div className={`home-page ${isDarkMode ? 'dark' : 'light'}`}>
            <PostCard 
                post={posts[currentIndex]} 
                onDelete={() => setShowDeletePopup(true)}
                isDarkMode={isDarkMode}
            />

            <div className="navigation-buttons">
                <button 
                    onClick={() => setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length)}
                    disabled={posts.length <= 1}
                >
                    Previous
                </button>
                <button 
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % posts.length)}
                    disabled={posts.length <= 1}
                >
                    Next
                </button>
            </div>

            {showDeletePopup && (
                <DeleteConfirmation
                    postId={posts[currentIndex]?.id}
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeletePopup(false)}
                />
            )}
        </div>
    );
};

export default Home;
