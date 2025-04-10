import React, { useState } from "react";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../../application/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const navigationDelay = 1500; 
  
  const { login, authLoading, authError, user } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [validationErrors, setValidationErrors] = useState({});
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showValidationErrorSnackbar, setShowValidationErrorSnackbar] =
    useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let errors = {};
    if (!form.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Invalid email format";
    }
    if (!form.password) {
      errors.password = "Password is required";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowValidationErrorSnackbar(false);
      const success = await login({ email: form.email, password: form.password });
      if (success) {
        setShowSuccessSnackbar(true);
        setTimeout(() => {
          navigate('/');
        }, navigationDelay);
      }
    } else {
      setShowValidationErrorSnackbar(true);
    }
  };

 

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      padding={2}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 4,
          maxWidth: 400,
          width: "100%",
          backgroundColor: "#121212",
          color: "white",
        }}
      >
        <Box textAlign="center" mb={3}>
          <img src={logo} alt="Logo" style={{ width: 100, height: "auto" }} />
          <Typography variant="h5" fontWeight="bold" mt={2}>
            Welcome Back!
          </Typography>
          <Typography variant="body2" color="gray">
            Please log in to continue
          </Typography>
        </Box>

        {authLoading ? (
          <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <form onSubmit={handleLoginSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                error={!!validationErrors.email}
                helperText={validationErrors.email}
                fullWidth
                variant="filled"
                InputLabelProps={{ style: { color: "#bbb" } }}
                InputProps={{
                  style: { backgroundColor: "#1e1e1e", color: "white" },
                }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                error={!!validationErrors.password}
                helperText={validationErrors.password}
                fullWidth
                variant="filled"
                InputLabelProps={{ style: { color: "#bbb" } }}
                InputProps={{
                  style: { backgroundColor: "#1e1e1e", color: "white" },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="secondary"
                disabled={authLoading}
              >
                Log In
              </Button>
            </Stack>
          </form>
        )}

        <Snackbar
          open={showSuccessSnackbar}
          autoHideDuration={2000}
          onClose={() => setShowSuccessSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            Logged in successfully!
          </Alert>
        </Snackbar>

        {/* Validation error snackbar */}
        <Snackbar
          open={showValidationErrorSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowValidationErrorSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="warning" variant="filled" sx={{ width: "100%" }}>
            Please check your credentials and try again...
          </Alert>
        </Snackbar>

        {authError && (
          <Snackbar
            open={!!authError}
            autoHideDuration={3000}
            onClose={() => {
              /* Handle closing error snackbar if needed */
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
              {authError}
            </Alert>
          </Snackbar>
        )}
      </Paper>
    </Box>
  );
};

export default Login;
