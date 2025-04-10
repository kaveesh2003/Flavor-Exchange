import React, { useState, useContext } from 'react';
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
  InputAdornment,
  IconButton,
  LinearProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useAuth } from '../../application/context/AuthContext'; 

const Signup = () => {
  const navigate = useNavigate();
  const { register, authLoading, authError } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [emailError, setEmailError] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === 'email') {
      setEmailError('');
    }
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordMismatch(false);
    }
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.match(/[a-z]/)) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    return Math.min(strength, 100);
  };

  const validateEmail = (email) => {
    if (!email) {
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email format';
    }
    return '';
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const emailErrorMessage = validateEmail(form.email);
    setEmailError(emailErrorMessage);

    if (form.password !== form.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    if (emailErrorMessage || passwordMismatch) {
      return;
    }

    try {
      const success = await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      if (success) {
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      // Error handling is now managed by the NewAuthContext and authError state
      console.error('Registration failed:', error);
      // The authError state from the context will likely be populated
    }
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

        {authLoading ? (
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
                  style: { backgroundColor: '#1e1e1e', color: 'white' },
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
                  style: { backgroundColor: '#1e1e1e', color: 'white' },
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
                  ),
                }}
              />

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
                  ),
                }}
              />

              <Button type="submit" variant="contained" fullWidth color="secondary" disabled={authLoading}>
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
          ✅ Account created! Redirecting to login...
        </Alert>
      </Snackbar>

      {authError && (
        <Snackbar
          open={!!authError}
          autoHideDuration={3000}
          onClose={() => {
            // You might want to add logic to reset the error state here
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
            {authError}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default Signup;