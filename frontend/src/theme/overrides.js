const overrides = {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', 
          borderRadius: '8px',  
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(255, 138, 101, 0.8)', 
          color: "#ffffff",           
          fontSize: "16px",
          fontWeight: 600, 
          textAlign: 'center',           
        },
        arrow: {
          color: 'rgba(255, 138, 101, 0.8)',           
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(242, 139, 130, 0.7)',  
          color: '#FFFFFF',   
          fontSize: '16px',  
          fontWeight: 600,       
          borderRadius: '5px',                           
          padding: '5px 30px',                          
                        
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
          root: {
      
          },
          head: {
              fontWeight: 'bold',
              fontSize: '20px',
              padding: '40px 20px',
              color: '#965000',
          },
          body: {
            padding: '40px 20px',
          },
      },
  },
};
  
export default overrides;