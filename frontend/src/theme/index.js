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
});

export default theme;
