import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Avatar, IconButton, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Masonry from '@mui/lab/Masonry';
import api from '../api/axiosConfig';
import EditUserForm from './EditUserForm';
import type { User } from '../types';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = () => api.get('/users').then(res => setUsers(res.data));
  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = (id: number) => {
    if (!window.confirm('Supprimer cet utilisateur ?')) return;
    api.delete(`/users/${id}`).then(fetchUsers);
  };

  return (
    <>
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
        {users.map(u => (
          <Card key={u.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 250 }}>
            <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
              {u.photo && <Avatar src={`http://localhost:5000/uploads/${u.photo}`} sx={{ width: 80, height: 80, mb: 1, mx: 'auto' }} />}
              <Typography variant="h6" noWrap>{u.name}</Typography>
              <Typography variant="body2" noWrap>{u.email}</Typography>
              {u.phone && <Typography variant="body2" noWrap>📞 {u.phone}</Typography>}
              {u.bio && (
                <Typography
                  variant="body2"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {u.bio}
                </Typography>
              )}
            </CardContent>
            <Box mb={1}>
              <IconButton onClick={() => setEditingUser(u)}><Edit /></IconButton>
              <IconButton onClick={() => handleDelete(u.id)} color="error"><Delete /></IconButton>
            </Box>
          </Card>
        ))}
      </Masonry>

      {/* Pop-up modification */}
      {editingUser && (
        <EditUserForm
          user={editingUser}
          onClose={() => { setEditingUser(null); fetchUsers(); }}
          onUpdate={(updatedUser) => setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u))}
        />
      )}
    </>
  );
};

export default UsersList;
