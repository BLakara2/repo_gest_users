import React from 'react';
import UsersList from '../components/UsersList';
import type { User } from '../types';

interface UsersPageProps {
  onEditUser: (user: User) => void;
}

const UsersPage: React.FC<UsersPageProps> = ({ onEditUser }) => {
  return <UsersList onEditUser={onEditUser} />;
};

export default UsersPage;
