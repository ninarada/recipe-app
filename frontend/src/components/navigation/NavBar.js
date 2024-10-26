import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";

const NavBar = () => {
    const theme = useTheme();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const isActive = (path) => location.pathname === path;

    const menuItems = isLoggedIn
        ? [
            { to: "/", label: "Home" },
            { to: "/recipes", label: "Search" },
            { to: "/create", label: "Create" },
            { to: "/profile", label: "Profile" },
            { to: "/", label: "Log Out" },
          ]
        : [
            { to: "/SignIn", label: "Sign In" },
            { to: "/SignUp", label: "Sign Up" },
    ];

    return (
        <Box
            className="navbar-box"
            sx={{
                position: "sticky",
                top: 0,
                zIndex: 5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderBottom: `1px solid ${theme.palette.secondary.light}`,
                padding: "10px 20px",
            }}
        >
            {isDesktop ? (
                <MenuDesktop menuItems={menuItems}/>
            ) : (
                <MenuMobile menuItems={menuItems}/>
            )}
            
            
        </Box>
    );
};

export default NavBar;
