import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useTheme, Drawer, List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const MenuMobile = ({menuItems}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };


  return (
    <>
      <MenuIcon onClick={toggleDrawer} />
      <Drawer 
        anchor="left" 
        open={open} 
        onClose={toggleDrawer} 
        PaperProps={{
        sx: { 
          width: "60%",
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '20px',
        },
      }}>
        <Box sx={{display:'flex', justifyContent: 'flex-end', marginBottom:'40px',}}>
          <CloseIcon onClick={toggleDrawer}/>
        </Box>
        <List sx={{padding: "0px 20px"}}>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.to; 
            return (
              <Link key={index} to={item.to} style={{ textDecoration: "none" }}>
                <ListItem
                  sx={{
                    textAlign: 'center',
                    color: isActive ? theme.palette.primary.main : theme.palette.grey[500],
                    textTransform: "lowercase",
                    borderLeft: isActive ? `2px solid ${theme.palette.primary.main}` : 'none', // Underline active item
                    "&:hover": {
                      color: theme.palette.secondary.dark,
                    },
                  }}
                >
                  <ListItemText primary={item.label} primaryTypographyProps={{ sx: { fontSize: '5vw' } }} />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>
      <Typography className="logo-box"
        sx={{
          color: theme.palette.deepOrange[500],
          fontWeight: 800,
          fontSize: "25px",
          fontStyle: "italic",
        }}
      >
        eRecipes
      </Typography>
      <AccountCircleIcon />
    </>
  );
};

export default MenuMobile;
