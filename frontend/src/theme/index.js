// src/theme/index.js
import { createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import shadows from './shadows';
import gradients from './gradients';
import overrides from './overrides';

const theme = createTheme({
  palette,      // Color definitions  
  typography,   // Font and typography settings
  shadows,
  gradients,   // Custom key for gradients
  components: overrides,  // Component overrides
  shadows: [
    'none', // 0
    '0px 1px 2px rgba(0,0,0,0.1)', // 1
    '0px 2px 4px rgba(0,0,0,0.1)', // 2
    '0px 3px 6px rgba(0,0,0,0.1)', // 3
    // Continue defining shadows up to the desired level
  ],
});

export default theme;
