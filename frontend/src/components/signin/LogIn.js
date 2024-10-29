import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import PrimaryButton from '../buttons/primaryButton';
import { login } from '../../redux/slices/userSlice';
import { useTheme } from '@emotion/react';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 400,
}));

const LogIn = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await dispatch(login({ username, password })).unwrap();
      localStorage.setItem('userData', JSON.stringify(userData));
      console.log(userData);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledPaper component={motion.div} elevation={3}>
      <Typography sx={{
        fontSize: '36px',
        fontWeight: 800,
        color: theme.palette.primary.main,
        textAlign: 'center'
      }}>
        Welcome Back!
      </Typography>
      <Typography sx={{
        fontSize: '18px',
        fontWeight: 800,
        color: theme.palette.grey[500],
        textAlign: 'center',
        padding: '10px 0px',
      }}>
        Log in to continue discovering delicious recipes  
      </Typography>

      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{
          padding: '0px 30px'
        }}
      >
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
        <Box sx={{
          display: 'flex',
          justifyContent:'center',
        }}>
          <PrimaryButton text={'Log In'} type="submit" fontsize={'18'} />
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent:'center',
        marginTop: '10px',
      }}>
        <Typography>
          Don't have an account?
        </Typography>
        <Typography 
          onClick={onSwitch} 
          sx={{
            color: theme.palette.beige[900],
            paddingLeft: '8px',
            fontWeight: 700,
            '&:hover' : {
              color: theme.palette.beige[600],
              cursor: 'pointer',
            }
          }}
        >
          Sign Up
        </Typography>
      </Box>
    </StyledPaper>
  );
};

export default LogIn;
