import React from 'react';
import { Box, Typography } from '@mui/material';
import SidebarItem from './SidebarItem'
import {
  Bookmark as BookmarkIcon,
  Event as EventIcon,
  Group as GroupIcon,
  History as HistoryIcon,
  Pages as PagesIcon,
  VideoLibrary as VideoLibraryIcon,
} from '@mui/icons-material';
import devCommunity from '../assets/images.png';
import reactLogo from '../assets/logo-react-icon-2048x1826-rf5m0dyz.png';


const Sidebar: React.FC = () => {
  return (
    <Box sx={{
      position: 'fixed',
      left: 0,
      top: '64px',
      width: '300px',
      height: 'calc(100vh - 64px)',
      bgcolor: 'white',
      p: 2,
      overflowY: 'auto',
      borderRight: '1px solid #e0e0e0'
    }}>
      <SidebarItem icon={<GroupIcon />} text="Groups" />
      <SidebarItem icon={<VideoLibraryIcon />} text="Videos" />
      <SidebarItem icon={<EventIcon />} text="Events" />
      <SidebarItem icon={<BookmarkIcon />} text="Saved" />
      <SidebarItem icon={<PagesIcon />} text="Pages" />
      <SidebarItem icon={<HistoryIcon />} text="Memories" />
      
      <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, color: 'gray' }}>
        Your shortcuts
      </Typography>
      <SidebarItem 
        icon={<img src={devCommunity} alt="shortcut" width={30} 
        style={{ 
        width: 30, 
        height: 30, 
        borderRadius: '50%', 
        objectFit: 'contain' 
      }} />} 
        text="Developer Community" 
      />
      <SidebarItem 
        icon={<img src={reactLogo} alt="shortcut" width={30} 
        style={{ 
        width: 30, 
        height: 30, 
        borderRadius: '50%', 
        objectFit: 'contain' 
      }} />} 
        text="React Developers" 
      />
    </Box>
  );
};

export default Sidebar;