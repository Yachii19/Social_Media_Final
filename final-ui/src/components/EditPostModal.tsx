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
import { UpdatePostData } from '../interfaces/Post';
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

interface EditPostModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (postData: UpdatePostData | FormData) => void;
    initialContent: string;
    initialImageUrl?: string;
    initialVideoUrl?: string;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ 
    open, 
    onClose, 
    onSubmit, 
    initialContent, 
    initialImageUrl, 
    initialVideoUrl 
}) => {
const [content, setContent] = useState(initialContent);
const [imageFile, setImageFile] = useState<File | null>(null);
const [videoFile, setVideoFile] = useState<File | null>(null);
const [imageUrl, setImageUrl] = useState(initialImageUrl || '');
const [videoUrl, setVideoUrl] = useState(initialVideoUrl || '');
const [activeTab, setActiveTab] = useState(0);

const handleSubmit = () => {
  if (imageFile || videoFile) {
    // Use FormData for file uploads
    const formData = new FormData();
    formData.append('content', content);
    if (imageFile) formData.append('imageFile', imageFile);
    if (videoFile) formData.append('videoFile', videoFile);
    // Pass formData to onSubmit
    onSubmit(formData);
  } else {
    // Use plain object for URL updates
    const updateData: UpdatePostData = {
      content,
      imageUrl: imageUrl || undefined,
      videoUrl: videoUrl || undefined,
    };

    // Pass updateData to onSubmit
    onSubmit(updateData);
  }

  handleClose();
};

const handleClose = () => {
    setContent(initialContent);
    setImageFile(null);
    setVideoFile(null);
    setImageUrl(initialImageUrl || '');
    setVideoUrl(initialVideoUrl || '');
    onClose();
};

return (
    <Modal open={open} onClose={handleClose}>
    <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Edit Post</Typography>
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
            label="Upload a new image"
            />
            <FileUpload
            onFileUpload={setVideoFile}
            accept="video/*"
            label="Upload a new video"
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
        
        <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button variant="outlined" onClick={handleClose}>
            Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
            Save Changes
        </Button>
        </Box>
    </Box>
    </Modal>
);
};

export default EditPostModal;