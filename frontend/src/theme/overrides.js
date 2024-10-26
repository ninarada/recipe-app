const overrides = {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Removes uppercase transformation
          borderRadius: '8px',   // Adds custom border-radius
        },
      },
    },
    
    // Add overrides for other components as needed
};
  
export default overrides;