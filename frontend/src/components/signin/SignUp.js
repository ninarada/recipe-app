import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../service/userService';
import { Box, TextField, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import PrimaryButton from '../buttons/primaryButton';
import { register } from '../../redux/slices/userSlice';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 300,
}));

const SignUp = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await dispatch(register({username, email, password})).unwrap();
      console.log(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <StyledPaper component={motion.div} >
      <Typography>
        Sign Up
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
          label="Email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <PrimaryButton text={'Sign Up'} type="submit"/>
      </Box>

      <Typography style={{ marginTop: 16 }}>
        Already have an account?{' '}
        <span onClick={onSwitch} >
          Log In
        </span>
      </Typography>
    </StyledPaper>
  );
};

export default SignUp;
