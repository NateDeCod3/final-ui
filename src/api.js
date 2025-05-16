const BASE_URL = 'https://final-api-o03a.onrender.com/manansala'; // ✅ Added /manansala prefix

export const getPosts = async () => await axios.get(`${BASE_URL}/posts`);
export const createPost = async (postData) => await axios.post(`${BASE_URL}/post`, postData);
export const searchPosts = async (key) => await axios.get(`${BASE_URL}/posts/search/${key}`);
export const deletePost = async (id) => await axios.delete(`${BASE_URL}/posts/${id}`);
export const bulkUpload = async (posts) => await axios.post(`${BASE_URL}/bulk-posts`, posts);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; 
import "./styles/theme.css"; 

// ✅ Ensure the root element exists before rendering
const rootElement = document.getElementById("root");
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Root element not found!");
}
