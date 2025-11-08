import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Switch, FormControlLabel, Button } from '@mui/material';
import UsersPage from './pages/UsersPage';
import ProfilePage from './pages/ProfilePage';
import type { User } from './types';

const AppRoutes: React.FC<{mode: 'light' | 'dark'; toggleMode: () => void}> = ({ mode, toggleMode }) => {
  const [editingUser, setEditingUser] = useState<User | null>(null);

  return (
    <BrowserRouter>
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    
    {/* Navbar */}
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{
          fontFamily: '"cursive"', flexGrow: 1 }}>
          Gestion des utilisateurs
        </Typography>
        <Button color="inherit" component={Link} sx={{
          fontFamily: '"cursive"'}} to="/">Accueil</Button>
        <Button color="inherit" sx={{
          fontFamily: '"cursive"',
          marginRight: 2}} component={Link} to="/profile">Ajouter</Button>
        <FormControlLabel 
          control={<Switch checked={mode === 'dark'} onChange={toggleMode} color="default" />}
          label={mode === 'dark' ? 'Sombre' : 'Clair'}
        />
      </Toolbar>
    </AppBar>

    {/* Contenu scrollable */}
    <Container
      sx={{
        mt: 4,
        flexGrow: 1,          // prend toute la hauteur restante
        overflowY: 'auto',    // scroll vertical si besoin
        mb: '90px',           // marge pour le footer
      }}
    >
      <Routes>
        <Route path="/" element={<UsersPage onEditUser={setEditingUser} />} />
        <Route path="/profile" element={<ProfilePage editingUser={editingUser} />} />
      </Routes>
    </Container>

    {/* Footer fixe */}
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '90px',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: '"cursive"',
          fontSize: 18,
          color: '#ffcc00',
        }}
      >
        👾 Coding by BLakara2 - 2025
      </Typography>
    </div>
  </div>
</BrowserRouter>

  );
};

export default AppRoutes;