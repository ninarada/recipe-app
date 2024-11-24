import React from "react";
import { Box, Typography, useTheme, Link, Grid } from "@mui/material";

const Footer = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.grey[900],
                color: theme.palette.common.white,
                padding: "20px",
                marginTop: "auto", // Pushes the footer to the bottom of the screen
                textAlign: "center",
            }}
        >
            <Grid container spacing={2} justifyContent="center">
                {/* Left Section: Links */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                        Quick Links
                    </Typography>
                    <Box>
                        <Link href="#" sx={{ color: theme.palette.common.white, display: "block", marginBottom: "5px" }}>
                            About Us
                        </Link>
                        <Link href="#" sx={{ color: theme.palette.common.white, display: "block", marginBottom: "5px" }}>
                            Privacy Policy
                        </Link>
                        <Link href="#" sx={{ color: theme.palette.common.white, display: "block", marginBottom: "5px" }}>
                            Terms & Conditions
                        </Link>
                    </Box>
                </Grid>

                {/* Center Section: Social Links */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                        Follow Us
                    </Typography>
                    <Box>
                        <Link href="#" sx={{ color: theme.palette.common.white, marginRight: "15px" }}>
                            <Typography>Facebook</Typography>
                        </Link>
                        <Link href="#" sx={{ color: theme.palette.common.white, marginRight: "15px" }}>
                            <Typography>Twitter</Typography>
                        </Link>
                        <Link href="#" sx={{ color: theme.palette.common.white, marginRight: "15px" }}>
                            <Typography>Instagram</Typography>
                        </Link>
                    </Box>
                </Grid>

                {/* Right Section: Contact */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                        Contact Us
                    </Typography>
                    <Typography sx={{ marginBottom: "5px" }}>Email: contact@example.com</Typography>
                    <Typography>Phone: (123) 456-7890</Typography>
                </Grid>
            </Grid>

            <Typography variant="body2" sx={{ marginTop: "20px" }}>
                &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
