import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";


const MenuDesktop = ({menuItems}) => {
    const theme = useTheme();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const isActive = (path) => location.pathname === path;


    return (
        <>
            <Link to="/" style={{ textDecoration: "none" }}>
                <Box
                    className="logo-box"
                    sx={{
                        color: theme.palette.primary.dark,
                        fontWeight: 600,
                        fontSize: "20px",
                        fontStyle: "italic",
                    }}
                >
                    eRecipes
                </Box>
            </Link>
            <Box
                className="all-tabs-box"
                sx={{
                    display: "flex",
                    gap: 3,
                }}
            >
                {menuItems.map((item, index) => (
                    <Link key={index} to={item.to} style={{ textDecoration: "none" }}>
                        <Typography
                            sx={{
                                color: theme.palette.grey[500],
                                textTransform: "lowercase",
                                "&:hover": {
                                    color: theme.palette.secondary.dark,
                                },
                            }}
                        >
                            {item.label}
                        </Typography>
                    </Link>
                ))}
            </Box>
        </>
    )
}

export default MenuDesktop;