import axios from 'axios';

const BASE_URL = 'https://final-api-o03a.onrender.com/api/posts';

export const getPosts = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const getPostById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
};

export const createPost = async (postData) => {
    try {
        const response = await axios.post(BASE_URL, postData);
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

export const updatePost = async (id, postData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, postData);
        return response.data;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

export const deletePost = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};

export const searchPosts = async (keyword) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/${keyword}`);
        return response.data;
    } catch (error) {
        console.error('Error searching posts:', error);
        throw error;
    }
};
