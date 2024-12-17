import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import RibbonLogo from "../ribbonHeader/RibbonLogo";


const MenuDesktop = ({ menuItems }) => {
  const theme = useTheme();
  const location = useLocation();

  return (
    <>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Box
          className="logo-box"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <RibbonLogo />
          
        </Box>
      </Link>
      <Box
        className="all-tabs-box"
        sx={{
          display: "flex",
          gap: 3,
        }}
      >
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.to;
          return (
            <Link key={index} onClick={item.onClick} to={item.to} style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  color: isActive
                    ? theme.palette.beige[800]
                    : theme.palette.brown[300],
                  textTransform: "lowercase",
                  "&:hover": {
                    color: theme.palette.beige[800],
                  },
                  fontSize: "20px",
                }}
              >
                {item.label}
              </Typography>
            </Link>
          );
        })}
      </Box>
    </>
  );
};

export default MenuDesktop;
