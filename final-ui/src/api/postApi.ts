import axios from 'axios';
import { Post, CreatePostData, UpdatePostData } from '../interfaces/Post';

const API_URL = 'https://social-media-backend-yieo.onrender.com/vinuya/posts';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPost = async (postData: FormData): Promise<Post> => {
  const response = await axios.post(API_URL, postData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const updatePost = async (postId: number, formData: FormData): Promise<Post> => {
  try {
    const response = await axios.put(`${API_URL}/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true, // Keep cookies included if needed
    });
    return response.data;
  } catch (error: any) {
    console.error('Error in updatePost:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};


export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const likePost = async (id: number): Promise<Post> => {
  const response = await axios.post(`${API_URL}/${id}/like`);
  return response.data;
};