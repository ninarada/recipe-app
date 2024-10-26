// src/Signup.js

import React from 'react';
import { Button, TextField, Typography, Paper } from '@mui/material';
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

const SignUp = ({ onSwitch }) => {
  return (
    <StyledPaper component={motion.div} elevation={3}>
      <Typography variant="h5" style={{color: 'var(--secondary-contrast-color)', textTransform: 'uppercase', fontWeight:'600'}}>Sign Up</Typography>
      <TextField label="Username" fullWidth margin="normal" required />
      <TextField label="Email" type="email" fullWidth margin="normal" required />
      <TextField label="Password" type="password" fullWidth margin="normal" required  style={{marginBottom: 24}}/>
      <PrimaryButton text={'Sign Up'} /> 
      <Typography variant="body2" style={{ marginTop: 16 }}>
        Already have an account?{' '}
        <span onClick={onSwitch} style={{ color: 'var(--primary-dark-color)', cursor: 'pointer' }}>
          Log In
        </span>
      </Typography>
    </StyledPaper>
  );
};

export default SignUp;
