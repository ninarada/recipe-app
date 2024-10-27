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
                        display:"flex",
                        alignItems:"center"
                    }}
                >
                    <Typography sx={{
                        color: theme.palette.deepOrange[900],
                        fontWeight: 900,
                        fontSize: "25px",
                        fontStyle: "italic",
                        textShadow: "0px 0px 1px rgba(0, 0, 0, 0.2)",
                    }}> 
                        e
                    </Typography>
                    <Typography sx={{
                        color: theme.palette.primary.dark,
                        fontWeight: 900,
                        fontSize: "25px",
                        fontStyle: "italic",
                        textShadow: "0px 0px 1px rgba(0, 0, 0, 0.2)",
                    }}>
                        Recipes
                    </Typography>
                    
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
                    <Link key={index} to={item.to} style={{ textDecoration: "none" }}>
                        <Typography
                            sx={{
                                color: isActive ? theme.palette.deepOrange[800] : theme.palette.brown[300],
                                textTransform: "lowercase",
                                "&:hover": {
                                    color: isActive ? theme.palette.beige[800] : theme.palette.beige[900],
                                },
                                fontSize: "20px",
                            }}
                        >
                            {item.label}
                        </Typography>
                    </Link>
                )})}
            </Box>
        </>
    )
}

export default MenuDesktop;