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
  CircularProgress,
  IconButton,
  InputAdornment,
  LinearProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    return score;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Email validation
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(value) ? '' : 'Enter a valid email');
    }

    // Password strength + mismatch check
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
      setPasswordMismatch(form.confirmPassword && value !== form.confirmPassword);
    }

    if (name === 'confirmPassword') {
      setPasswordMismatch(form.password !== value);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (emailError || passwordMismatch || !form.password || !form.name) return;

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({
        name: form.name,
        email: form.email
      }));

      setLoading(false);
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }, 1500);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh" padding={2}>
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
            Create Account
          </Typography>
          <Typography variant="body2" color="gray">
            Join us and start saving your favorite recipes!
          </Typography>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <form onSubmit={handleSignup}>
            <Stack spacing={2}>
              <TextField
                label="Name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                fullWidth
                variant="filled"
                InputLabelProps={{ style: { color: '#bbb' } }}
                InputProps={{
                  style: { backgroundColor: '#1e1e1e', color: 'white' }
                }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                error={!!emailError}
                helperText={emailError}
                fullWidth
                variant="filled"
                InputLabelProps={{ style: { color: '#bbb' } }}
                InputProps={{
                  style: { backgroundColor: '#1e1e1e', color: 'white' }
                }}
              />
              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={form.password}
                onChange={handleChange}
                fullWidth
                variant="filled"
                InputLabelProps={{ style: { color: '#bbb' } }}
                InputProps={{
                  style: { backgroundColor: '#1e1e1e', color: 'white' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              {/* Password Strength Meter */}
              {form.password && (
                <Box>
                  <Typography variant="caption" color="gray">
                    Password Strength
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={passwordStrength}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#333',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor:
                          passwordStrength < 50
                            ? 'red'
                            : passwordStrength < 75
                            ? 'orange'
                            : 'green',
                      },
                    }}
                  />
                </Box>
              )}

              <TextField
                label="Repeat Password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                value={form.confirmPassword}
                onChange={handleChange}
                fullWidth
                variant="filled"
                error={passwordMismatch}
                helperText={passwordMismatch ? 'Passwords do not match' : ''}
                InputLabelProps={{ style: { color: '#bbb' } }}
                InputProps={{
                  style: { backgroundColor: '#1e1e1e', color: 'white' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button type="submit" variant="contained" fullWidth color="secondary">
                Sign Up
              </Button>
            </Stack>
          </form>
        )}
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          Account created! Redirecting to login...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Signup;
