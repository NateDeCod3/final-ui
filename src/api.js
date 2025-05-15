import axios from 'axios';

const BASE_URL = 'http://localhost:8080/manansala';

export const getPosts = async () => await axios.get(`${BASE_URL}/posts`);
export const createPost = async (postData) => await axios.post(`${BASE_URL}/post`, postData);
export const searchPosts = async (key) => await axios.get(`${BASE_URL}/posts/search/${key}`);
export const deletePost = async (id) => await axios.delete(`${BASE_URL}/posts/${id}`);
export const bulkUpload = async (posts) => await axios.post(`${BASE_URL}/bulk-posts`, posts);
