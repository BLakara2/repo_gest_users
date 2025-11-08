import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

interface ProfileCardProps {
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  photo?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, phone, bio, photo }) => {
  return (
    <Box p={3} border={1} borderRadius={2} maxWidth={400} mx="auto" textAlign="center">
      {photo && <Avatar src={photo} sx={{ width: 100, height: 100, mb: 2, mx: 'auto' }} />}
      <Typography variant="h6">{name || 'Nom inconnu'}</Typography>
      <Typography variant="body1">{email || 'Email inconnu'}</Typography>
      {phone && <Typography variant="body2">📞 {phone}</Typography>}
      {bio && <Typography variant="body2" mt={1}>{bio}</Typography>}
    </Box>
  );
};

export default ProfileCard;
