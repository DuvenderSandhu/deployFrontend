import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/todos`; // Replace this with your deployed backend URL when deploying

export const getTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const addTodo = async (text) => {
  try {
    const response = await axios.post(API_URL, { text });
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const updateTodo = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
