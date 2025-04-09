import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  Stack,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ email: form.email }));
      setLoading(false);
      setShowSnackbar(true);

      setTimeout(() => {
        navigate('/');
      }, 1000);
    }, 1500);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" padding={2}>
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 4,
          maxWidth: 400,
          width: '100%',
          backgroundColor: '#121212', 
          color: 'white',
        }}
      >
        <Box textAlign="center" mb={3}>
          <img src={logo} alt="Logo" style={{ width: 100, height: 'auto' }} />
          <Typography variant="h5" fontWeight="bold" mt={2}>
            Welcome Back!
          </Typography>
          <Typography variant="body2" color="gray">
            Please log in to continue
          </Typography>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                fullWidth
                variant="filled"
                InputLabelProps={{ style: { color: '#bbb' } }}
                InputProps={{
                  style: { backgroundColor: '#1e1e1e', color: 'white' },
                }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                fullWidth
                variant="filled"
                InputLabelProps={{ style: { color: '#bbb' } }}
                InputProps={{
                  style: { backgroundColor: '#1e1e1e', color: 'white' },
                }}
              />
              <Button type="submit" variant="contained" fullWidth color="secondary">
                Log In
              </Button>
            </Stack>
          </form>
        )}
      </Paper>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          Logged in successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
