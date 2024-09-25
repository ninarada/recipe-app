import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";


const NavBar = () => {
    const location = useLocation();
    const [isLoggedIn, setisLoggedIn] = useState(true);
    const isActive = (path) => location.pathname === path;

    const menuItems = isLoggedIn
    ? [
        { to: "/", label: "Home" },
        { to: "/recipes", label: "Search" },
        { to: "/create", label: "Create"},
        { to: "/profile", label: "Profile"},
        { to: "/", label: "Log Out"},
      ]
    : [
        { to: "/SignIn", label: "Sign In" },
        { to: "/SignUp", label: "Sign Up" },
    ];

    return (
        <Box className="navbar-box" sx={{
            position: "sticky",
            top: 0,
            zIndex: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "var(--paper-shadow)",
            borderBottom: "solid 1px var(--secondary-dark-color)",
            padding: "10px 20px",
        }}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
                <Box className="logo-box" sx={{
                    color: 'var(--primary-dark-color)',
                    fontWeight: '600',
                    fontSize: '20px',
                    fontStyle: 'italic',
                }}>
                    eRecipes
                </Box>
            </Link>
            <Box className="all-tabs-box" sx={{
                display:'flex',
                gap: '25px',
            }}>
                {menuItems.map((item, index) => (
                    <Link key={index} to={item.to} style={{ textDecoration: "none" }}>
                        <Typography sx={{
                            color: 'var(--grey-medium-color)',
                            textTransform: 'lowercase',
                            '&:hover': {
                                color: 'var(--secondary-dark-color)',
                            }
                        }}>
                            {item.label}
                        </Typography>
                    </Link>
                ))}
            </Box>
        </Box>
    );
}

export default NavBar;