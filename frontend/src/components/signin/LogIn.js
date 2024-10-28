import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import PrimaryButton from '../buttons/primaryButton';
import { login } from '../../redux/slices/userSlice';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);
  const userInfo = useSelector((state) => state.user.userInfo); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await dispatch(login({ username, password })).unwrap();
      console.log(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userInfo) {
      console.log("User Info after dispatch:", userInfo); // Log user info after successful login
    }
  }, [userInfo]); 

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
