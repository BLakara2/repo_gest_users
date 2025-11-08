import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Avatar, Typography, Grid, MenuItem } from '@mui/material';
import api from '../api/axiosConfig';
import { countries } from '../utils/countries';
import Toast from './Toast';
import type { User } from '../types';

interface EditUserFormProps {
  user: User;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void; // callback pour mettre à jour UsersList
}

interface Profile {
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  photo?: string;
  countryCode?: string;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onClose, onUpdate }) => {
const [profile, setProfile] = useState<Profile>({ ...user });

useEffect(() => {
  setProfile({ ...user });
  setPreview(user.photo ? `http://localhost:5000/uploads/${user.photo}` : null);
  setFile(null);
  setErrors([]);
}, [user]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(user.photo ? `http://localhost:5000/uploads/${user.photo}` : null);
  const [errors, setErrors] = useState<string[]>([]);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>('success');

  const showToast = (message: string, severity: 'success' | 'error') => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const getPhoneLengths = (code: string) =>
    countries.find((c) => c.code === code)?.phoneLengths || [8, 9, 10, 11];

  const validate = (): boolean => {
    const errs: string[] = [];
    if (!profile.name.trim()) errs.push('Le nom est requis.');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) errs.push('Email invalide.');
    if (profile.phone) {
      const digitsOnly = profile.phone.replace(/\D/g, '');
      const allowedLengths = getPhoneLengths(profile.countryCode || '+33');
      if (!allowedLengths.includes(digitsOnly.length)) errs.push(`Numéro invalide pour le pays ${profile.countryCode}.`);
    }
    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    formData.append('phone', profile.phone || '');
    formData.append('bio', profile.bio || '');
    formData.append('countryCode', profile.countryCode || '+261');
    if (file) formData.append('photo', file);

    try {
      const res = await api.put(`/users/${user.id}`, formData);
      showToast('Utilisateur modifié avec succès !', 'success');
      onUpdate({
        ...user,
        ...res.data
        });
      setTimeout(() => onClose(), 1500);
    } catch (err: any) {
      console.error(err);
      showToast(err?.response?.data || 'Erreur lors de la modification.', 'error');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    if (f) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(user.photo ? `http://localhost:5000/uploads/${user.photo}` : null);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} mt={1}>
      <Toast open={toastOpen} message={toastMessage} severity={toastSeverity} onClose={() => setToastOpen(false)} />

      {errors.length > 0 && errors.map((err, idx) => <Typography key={idx} color="error">{err}</Typography>)}

      {preview && <Avatar src={preview} sx={{ width: 100, height: 100, mb: 2, mx: 'auto' }} />}
      <TextField label="Nom" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} fullWidth />
      <TextField label="Email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} fullWidth />

      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField select label="Pays" value={profile.countryCode} onChange={e => setProfile({ ...profile, countryCode: e.target.value })} fullWidth>
            {countries.map(c => <MenuItem key={c.code} value={c.code}>{c.name} ({c.code})</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={8}>
          <TextField label="Numéro" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} fullWidth />
        </Grid>
      </Grid>

      <TextField label="Bio" value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} fullWidth multiline rows={3} />

      <Button variant="outlined" component="label" sx={{ backgroundColor: '#2e7d32', color: '#fff', '&:hover': { backgroundColor: '#57a05a' } }}>
        {preview ? 'Changer la photo' : 'Ajouter une photo'}
        <input type="file" hidden onChange={handleFileChange} />
      </Button>

      <Button type="submit" variant="contained" sx={{ backgroundColor: '#2e7d32', color: '#fff', '&:hover': { backgroundColor: '#57a05a' } }}>
        Modifier
      </Button>
    </Box>
  );
};

export default EditUserForm;
