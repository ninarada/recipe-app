import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Box, TextField, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import PrimaryButton from '../buttons/primaryButton';
import { register } from '../../redux/slices/userSlice';
import { useTheme } from '@emotion/react';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 400,
}));

const SignUp = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await dispatch(register({username, email, password})).unwrap();
      localStorage.setItem('userData', JSON.stringify(userData));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <StyledPaper component={motion.div} >
      <Typography sx={{
        fontSize: '36px',
        fontWeight: 800,
        color: theme.palette.primary.main,
        textAlign: 'center'
      }}>
        Create Your Account
      </Typography>
      <Typography sx={{
        fontSize: '18px',
        fontWeight: 800,
        color: theme.palette.grey[500],
        textAlign: 'center',
        padding: '10px 0px',
      }}>
        Sign up to discover, save, and create recipes!  
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
        <Box sx={{
          display: 'flex',
          justifyContent:'center',
        }}>
          <PrimaryButton text={'Sign Up'} type="submit" fontsize={'18'}/>
        </Box>
        
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent:'center',
        marginTop: '10px',
      }}>
        <Typography>
          Already have an account?
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
            Log In
          </Typography>
      </Box>
      
    </StyledPaper>
  );
};

export default SignUp;
