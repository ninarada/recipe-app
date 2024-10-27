import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../service/userService';
import { Box, TextField, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import PrimaryButton from '../buttons/primaryButton';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 300,
}));

const LogIn = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      // add display a success message
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <StyledPaper component={motion.div} elevation={3}>
      <Typography>
        Log In
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField 
          label="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth 
          margin="normal" 
          required 
        />
        <TextField 
          label="Password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth 
          margin="normal" 
          required 
          style={{marginBottom: 24}}
        />
        {error && <Typography>{error}</Typography>}
        <PrimaryButton text={'Log In'} type="submit" /> 
      </Box>
      
      <Typography>
        Don't have an account?{' '}
        <span onClick={onSwitch}>
          Sign Up
        </span>
      </Typography>
    </StyledPaper>
  );
};

export default LogIn;
