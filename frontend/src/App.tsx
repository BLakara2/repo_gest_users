import React, { useState, useEffect } from 'react';
import {
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  photo?: string;
  countryCode?: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // --- 🎨 Thème Pixel Game ---
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#00ff88' : '#0f9d58', // vert néon pixel
      },
      secondary: {
        main: darkMode ? '#ff4081' : '#ff007f', // rose flashy
      },
      background: {
        default: darkMode ? '#0a0a0a' : '#f0f0f0',
        paper: darkMode ? '#121212' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Press Start 2P", cursive', // 👾 Police pixel
      fontSize: 10,
      button: {
        textTransform: 'none',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: '"Press Start 2P", cursive',
            borderRadius: 0,
            padding: '6px 12px',
            boxShadow: '2px 2px 0px #000',
            border: '2px solid #000',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '4px 4px 0px #000',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        color="primary"
        sx={{
          borderBottom: '4px solid #000',
          boxShadow: 'none',
          backgroundImage: 'none',
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            👾 Gestion des utilisateurs
          </Typography>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ paddingTop: 3 }}>
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card
                sx={{
                  backgroundColor: darkMode ? '#1c1c1c' : '#fff',
                  borderRadius: 0,
                  border: '3px solid #000',
                  boxShadow: '4px 4px 0px #000',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '8px 8px 0px #000',
                  },
                }}
              >
                {user.photo && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={`http://localhost:5000/uploads/${user.photo}`}
                    alt={user.name}
                    sx={{
                      borderBottom: '3px solid #000',
                      objectFit: 'cover',
                    }}
                  />
                )}
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontSize: 12, lineHeight: 1.4 }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: 10 }}
                  >
                    {user.email}
                  </Typography>
                  {user.phone && (
                    <Typography variant="body2" sx={{ fontSize: 10 }}>
                      📞 {user.countryCode} {user.phone}
                    </Typography>
                  )}
                  {user.bio && (
                    <Typography
                      variant="body2"
                      sx={{ marginTop: 1, fontSize: 10 }}
                    >
                      📝 {user.bio}
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{
                      marginTop: 2,
                    }}
                    onClick={() => alert(`Modifier ${user.name} !`)}
                  >
                    Modifier
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
