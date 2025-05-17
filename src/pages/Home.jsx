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

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
    };

    const handleDelete = async () => {
        try {
            await deletePost(posts[currentIndex].id);
            await fetchPosts(); // Refresh the posts list
            
            // Reset to first post if current index is out of bounds
            if (currentIndex >= posts.length - 1) {
                setCurrentIndex(0);
            }
            
            alert('Post deleted successfully!');
        } catch (err) {
            console.error('Error deleting post:', err);
            alert('Failed to delete post');
        } finally {
            setShowDeletePopup(false);
        }
    };

    if (loading) return <div className={`loading ${isDarkMode ? 'dark' : 'light'}`}>Loading...</div>;
    if (posts.length === 0) return <div className={`no-posts ${isDarkMode ? 'dark' : 'light'}`}>No posts available</div>;

    return (
        <div className={`home-page ${isDarkMode ? 'dark' : 'light'}`}>
            <PostCard 
                post={posts[currentIndex]} 
                onDelete={() => setShowDeletePopup(true)}
                isDarkMode={isDarkMode}
            />

            <div className="navigation-buttons">
                <button onClick={handlePrevious} disabled={posts.length <= 1}>
                    Previous
                </button>
                <button onClick={handleNext} disabled={posts.length <= 1}>
                    Next
                </button>
            </div>

            {showDeletePopup && (
                <DeleteConfirmation
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeletePopup(false)}
                />
            )}
        </div>
    );
};

export default Home;
