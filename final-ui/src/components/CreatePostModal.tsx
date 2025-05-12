import React, { useState } from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  Avatar, 
  TextField, 
  Button, 
  Divider,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import FileUpload from './FileUpload';
import { CreatePostData } from '../interfaces/Post';
import avatarImage from '../assets/484037696_3835802006674477_7238484737526930780_n.jpg';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
};

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (postData: CreatePostData) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ open, onClose, onSubmit }) => {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const handleSubmit = () => {
    const postData: CreatePostData = { content };
    
    if (imageFile) {
      postData.imageFile = imageFile;
    } else if (imageUrl) {
      postData.imageUrl = imageUrl;
    }
    
    if (videoFile) {
      postData.videoFile = videoFile;
    } else if (videoUrl) {
      postData.videoUrl = videoUrl;
    }
    
    onSubmit(postData);
    handleClose();
  };

  const handleClose = () => {
    setContent('');
    setImageFile(null);
    setVideoFile(null);
    setImageUrl('');
    setVideoUrl('');
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Create Post</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: '#3f51b5', mr: 2 }}
          src={avatarImage}></Avatar>
          <Typography variant="subtitle1">John Rein Vinuya</Typography>
        </Box>
        
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="What's on your mind?"
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 2 }}>
          <Tab label="Upload" />
          <Tab label="URL" />
        </Tabs>
        
        {activeTab === 0 ? (
          <>
            <FileUpload
              onFileUpload={setImageFile}
              accept="image/*"
              label="Upload an image"
            />
            <FileUpload
              onFileUpload={setVideoFile}
              accept="video/*"
              label="Upload a video"
            />
          </>
        ) : (
          <>
            <TextField
              fullWidth
              label="Image URL"
              variant="outlined"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Video URL"
              variant="outlined"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              sx={{ mb: 2 }}
            />
          </>
        )}
        
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!content.trim() && !imageFile && !videoFile && !imageUrl && !videoUrl}
        >
          Post
        </Button>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;