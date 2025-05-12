import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  InputBase, 
  Badge,
  Avatar
} from '@mui/material';
import { 
  Search as SearchIcon,
  Home as HomeIcon,
  Flag as FlagIcon,
  Subscriptions as SubscriptionsIcon,
  Storefront as StorefrontIcon,
  SupervisedUserCircle as SupervisedUserCircleIcon,
  Add as AddIcon,
  Forum as ForumIcon,
  NotificationsActive as NotificationsActiveIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import avatarImage from '../assets/484037696_3835802006674477_7238484737526930780_n.jpg';

const Navbar: React.FC = () => {
  return (
    <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'black', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#1877f2',
              mr: 2
            }}
          >
            socialfeed
          </Typography>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f0f2f5',
            borderRadius: 20,
            padding: '5px 10px',
            marginLeft: 10
          }}>
            <SearchIcon sx={{ color: 'gray' }} />
            <InputBase
              placeholder="Search..."
              sx={{ ml: 1, flex: 1 }}
            />
          </div>
        </div>

        {/* Center section */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <IconButton sx={{ color: '#1877f2' }}>
            <HomeIcon fontSize="large" />
          </IconButton>
          <IconButton sx={{ color: 'gray' }}>
            <FlagIcon fontSize="large" />
          </IconButton>
          <IconButton sx={{ color: 'gray' }}>
            <SubscriptionsIcon fontSize="large" />
          </IconButton>
          <IconButton sx={{ color: 'gray' }}>
            <StorefrontIcon fontSize="large" />
          </IconButton>
          <IconButton sx={{ color: 'gray' }}>
            <SupervisedUserCircleIcon fontSize="large" />
          </IconButton>
        </div>

        {/* Right section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <IconButton>
            <Avatar sx={{ bgcolor: '#f0f2f5', color: 'black' }} src={avatarImage}></Avatar>
          </IconButton>
          <Typography variant="body1">John Rein Vinuya</Typography>
          <IconButton sx={{ bgcolor: '#f0f2f5' }}>
            <AddIcon />
          </IconButton>
          <IconButton sx={{ bgcolor: '#f0f2f5' }}>
            <ForumIcon />
          </IconButton>
          <IconButton sx={{ bgcolor: '#f0f2f5' }}>
            <Badge badgeContent={4} color="error">
              <NotificationsActiveIcon />
            </Badge>
          </IconButton>
          <IconButton sx={{ bgcolor: '#f0f2f5' }}>
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;