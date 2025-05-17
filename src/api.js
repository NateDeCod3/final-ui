import axios from 'axios';

const API_BASE_URL = 'https://final-api-o03a.onrender.com/api/posts';

const api = {
    getPosts: async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    },

    getPostById: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching post:', error);
            throw error;
        }
    },

    createPost: async (postData) => {
        try {
            const response = await axios.post(API_BASE_URL, postData);
            return response.data;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    },

    updatePost: async (id, postData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}`, postData);
            return response.data;
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    },

    deletePost: async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    },

    searchPosts: async (keyword) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/search/${keyword.toLowerCase()}`);
            return response.data;
        } catch (error) {
            console.error('Error searching posts:', error);
            throw error;
        }
    }
};

export default api;
