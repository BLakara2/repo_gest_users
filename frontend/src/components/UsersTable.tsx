import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Avatar, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import api from '../api/axiosConfig';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  photo?: string;
}

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = () => {
    api.get('/users').then(res => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id: number) => {
    if (!window.confirm('Supprimer cet utilisateur ?')) return;
    api.delete(`/users/${id}`).then(() => fetchUsers());
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Photo</TableCell>
          <TableCell>Nom</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Téléphone</TableCell>
          <TableCell>Bio</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(u => (
          <TableRow key={u.id}>
            <TableCell>
              {u.photo && <Avatar src={`http://localhost:5000/uploads/${u.photo}`} />}
            </TableCell>
            <TableCell>{u.name}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>{u.phone}</TableCell>
            <TableCell>{u.bio}</TableCell>
            <TableCell>
              <IconButton onClick={() => alert(`Edit user ${u.id}`)}><Edit /></IconButton>
              <IconButton onClick={() => handleDelete(u.id)} color="error"><Delete /></IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
