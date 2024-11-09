// src/theme/index.js
import { createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import shadows from './shadows';
import gradients from './gradients';
import overrides from './overrides';

const theme = createTheme({
  palette,      
  typography,   
  shadows,
  gradients,   
  components: overrides,  
  shadows: [
    'none', 
    '0px 1px 2px rgba(0,0,0,0.1)', 
    '0px 2px 4px rgba(0,0,0,0.1)', 
    '0px 3px 6px rgba(0,0,0,0.1)', 
  ],
});

export default theme;
