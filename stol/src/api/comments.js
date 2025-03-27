import axios from 'axios';

const API_BASE = 'https://webcomp.bsu.ru/api/finals25';

export const getComments = async (dishId, token = null) => {
  const endpoint = token ? `allcomments/${dishId}` : `comments/${dishId}`;
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  
  const response = await axios.get(`${API_BASE}/${endpoint}`, config);
  return response.data.data;
};

export const addComment = async (commentData, token) => {
  const response = await axios.put(`${API_BASE}/comments/add`, commentData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.data;
};

export const toggleCommentStatus = async (commentId, token) => {
  const response = await axios.get(`${API_BASE}/changecommentstatus/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.data;
};

export const deleteComment = async (commentId, token) => {
  const response = await axios.get(`${API_BASE}/deletecomment/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.data;
};

export const getUserComments = async (token) => {
  const response = await axios.get(`${API_BASE}/fullcomments`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.data;
};