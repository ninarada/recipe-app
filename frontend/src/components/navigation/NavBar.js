import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../redux/slices/userSlice";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";

const NavBar = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const userInfo = useSelector((state) => state.user.userInfo); 
    const dispatch = useDispatch();

    const menuItems = userInfo
        ? [
            { to: "/", label: "Home" },
            { to: "/recipes", label: "Search" },
            { to: "/create", label: "Create" },
            { to: "/profile", label: "Profile" },
            { to: "/signin", label: "Log Out", onClick: () => dispatch(logout())  },
          ]
        : [
            { to: "/signin", label: "Sign In" },
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
