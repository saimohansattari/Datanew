// components/Login/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { TextField, Button, Typography, Box } from '@mui/material';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <Box textAlign="center" sx={{ maxWidth: 400, margin: 'auto', padding: '2rem', boxShadow: 2, borderRadius: '10px' }}>
      <Typography variant="h4" marginBottom={4}>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1.5rem' }}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
