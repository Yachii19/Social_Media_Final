import React from 'react';
import { Box, Typography } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

interface SidebarItemProps {
  icon: React.ReactElement<SvgIconProps> | React.ReactNode;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text }) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      p: 1,
      borderRadius: 1,
      '&:hover': {
        bgcolor: '#f0f2f5',
        cursor: 'pointer'
      }
    }}>
      <Box sx={{
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mr: 1
      }}>
        {icon}
      </Box>
      <Typography variant="body1">{text}</Typography>
    </Box>
  );
};

export default SidebarItem;