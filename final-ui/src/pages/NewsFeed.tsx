import React, { useEffect, useState } from 'react';
import { Post } from '../interfaces/Post';
import { fetchPosts, createPost, updatePost, deletePost, likePost } from '../api/postApi';
import PostCard from '../components/PostCard';
import CreatePostModal from '../components/CreatePostModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import Navbar from '../components/NavBar';
import Sidebar from '../components/SideBar';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { UpdatePostData } from '../interfaces/Post';

const NewsFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, []);

  const handleCreatePost = async (postData: { 
    content: string; 
    imageFile?: File; 
    videoFile?: File;
    imageUrl?: string;
    videoUrl?: string;
  }) => {
    try {
      const formData = new FormData();
      formData.append('content', postData.content);
      
      if (postData.imageFile) {
        formData.append('imageFile', postData.imageFile);
      } else if (postData.imageUrl) {
        formData.append('imageUrl', postData.imageUrl);
      }
      
      if (postData.videoFile) {
        formData.append('videoFile', postData.videoFile);
      } else if (postData.videoUrl) {
        formData.append('videoUrl', postData.videoUrl);
      }
      
      const newPost = await createPost(formData);
      setPosts([newPost, ...posts]);
      setCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleUpdatePost = async (postId: number, postData: UpdatePostData | FormData) => {
    try {
      const updatedPost = await updatePost(postId, postData);
      setPosts(posts.map(post => (post.id === postId ? updatedPost : post)));
    } catch (error) {
      console.error('Error updating post:', error);
      alert(`Failed to update the post. ${error instanceof Error ? error.message : 'Please try again.'}`);
    }
  };

  const handleDeletePost = async () => {
    if (!postToDelete) return;

    try {
      await deletePost(postToDelete.id);
      setPosts(posts.filter(post => post.id !== postToDelete.id));
      setDeleteModalOpen(false);
      setPostToDelete(null);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleLikePost = async (postId: number) => {
    try {
      const likedPost = await likePost(postId);
      setPosts(posts.map(post => post.id === postId ? likedPost : post));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh' }}>
      <Navbar />
      <Sidebar />
      
      <Box sx={{ 
        ml: '300px', 
        pt: '64px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateModalOpen(true)}
          sx={{ 
            mt: 3,
            mb: 2,
            alignSelf: 'center',
            width: 'calc(100% - 64px)',
            maxWidth: 800
          }}
        >
          Create Post
        </Button>
        
        {posts.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No posts yet. Be the first to post something!
          </Typography>
        ) : (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLikePost}
              onEdit={handleUpdatePost}
              onDelete={(postId) => {
                const postToDelete = posts.find(post => post.id === postId);
                setPostToDelete(postToDelete || null);
                setDeleteModalOpen(true);
              }}
            />
          ))
        )}
      </Box>
      
      <CreatePostModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeletePost}
      />
    </Box>
  );
};

export default NewsFeed;