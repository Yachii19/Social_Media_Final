import React, { useState } from 'react';
import { Post } from '../interfaces/Post';
import { formatDistanceToNow } from 'date-fns';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Avatar,
  Box,
  Paper,
  TextField,
  Button,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Close as CloseIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import FileUpload from './FileUpload';
import avatarImage from '../assets/484037696_3835802006674477_7238484737526930780_n.jpg';
import { UpdatePostData } from '../interfaces/Post';
const isYouTubeUrl = (url: string) => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

const isFacebookUrl = (url: string) => {
  return url.includes('facebook.com') || url.includes('fb.watch');
};

const getYouTubeEmbedUrl = (url: string) => {
  // Handle youtu.be short links
  if (url.includes('youtu.be')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Handle regular YouTube links
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = (match && match[2].length === 11) ? match[2] : null;
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const getFacebookEmbedUrl = (url: string) => {
  // Basic Facebook URL conversion to embed (Facebook requires their own embed code)
  return url.replace('facebook.com', 'facebook.com/plugins/video.php');
};

interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
  onEdit: (postId: number, postData: UpdatePostData | FormData) => Promise<void>;
  onDelete: (postId: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(post.content);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(post.imageUrl || '');
  const [videoUrl, setVideoUrl] = useState(post.videoUrl || '');
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setContent(post.content);
    setImageFile(null);
    setVideoFile(null);
    setImageUrl(post.imageUrl || '');
    setVideoUrl(post.videoUrl || '');
  };

  const handleSaveEdit = async () => {
    setIsLoading(true);
    try {
      if (imageFile || videoFile) {
        const formData = new FormData();
        formData.append('content', content);
        if (imageFile) formData.append('imageFile', imageFile);
        if (videoFile) formData.append('videoFile', videoFile);
        await onEdit(post.id, formData);
      } else {
        const updateData: UpdatePostData = {
          content,
          imageUrl: imageUrl || undefined,
          videoUrl: videoUrl || undefined,
        };
        await onEdit(post.id, updateData);
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const mediaContainerStyle = {
    width: '100%',
    height: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  };

  return (
    <Card
      sx={{
        maxWidth: 800,
        width: '100%',
        margin: '20px auto',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: '#3f51b5' }} src={avatarImage} />}
        title="John Rein Vinuya"
        subheader={formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        action={
          !isEditing && (
            <Box>
              <IconButton onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(post.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )
        }
      />

      <Box sx={{ p: 2 }}>
        {isEditing ? (
          <>
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
            
            <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
              <Button 
                variant="outlined" 
                onClick={handleCancelEdit}
                startIcon={<CloseIcon />}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                onClick={handleSaveEdit}
                disabled={isLoading}
                startIcon={<CheckIcon />}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </Box>
          </>
        ) : (
          <>
            {post.content && (
              <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
                {post.content}
              </Typography>
            )}

            <Paper elevation={0} sx={mediaContainerStyle}>
              {post.imageUrl ? (
              <CardMedia
                component="img"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
                image={
                  post.imageUrl.startsWith('http')
                    ? post.imageUrl
                    : `http://localhost:8080${post.imageUrl}`
                }
                alt="Post image"
              />
              ) : post.videoUrl ? (
                <Box sx={{ width: '100%', height: '100%' }}>
                  {isYouTubeUrl(post.videoUrl) ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={getYouTubeEmbedUrl(post.videoUrl)}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ border: 'none' }}
                    />
                  ) : isFacebookUrl(post.videoUrl) ? (
                    <iframe
                      src={getFacebookEmbedUrl(post.videoUrl)}
                      width="100%"
                      height="100%"
                      style={{ border: 'none', overflow: 'hidden' }}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                  ) : (
                    <video
                      controls
                      src={
                        post.videoUrl.startsWith('http')
                          ? post.videoUrl
                          : `http://localhost:8080${post.videoUrl}`
                      }
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  )}
                </Box>
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fafafa',
                    p: 3,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {post.content || 'No media content'}
                  </Typography>
                </Box>
              )}
            </Paper>
          </>
        )}
      </Box>

      {!isEditing && (
        <CardActions disableSpacing sx={{ justifyContent: 'space-between', p: 2 }}>
          <Box>
            <IconButton aria-label="like" onClick={() => onLike(post.id)}>
              <ThumbUpIcon color={post.likes > 0 ? 'primary' : 'inherit'} />
              <Typography sx={{ ml: 1 }}>{post.likes}</Typography>
            </IconButton>
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Box>
        </CardActions>
      )}
    </Card>
  );
};

export default PostCard;