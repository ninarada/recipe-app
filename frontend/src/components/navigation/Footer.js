// import React from "react";
// import { Box, Typography, useTheme, Link, Grid } from "@mui/material";

// const Footer = () => {
//     const theme = useTheme();

//     return (
//         <Box
//             sx={{
//                 backgroundColor: theme.palette.grey[900],
//                 color: theme.palette.common.white,
//                 padding: "20px",
//                 marginTop: "auto", // Pushes the footer to the bottom of the screen
//                 textAlign: "center",
//             }}
//         >
//             <Grid container spacing={2} justifyContent="center">
//                 {/* Left Section: Links */}
//                 <Grid item xs={12} sm={4}>
//                     <Typography variant="h6" sx={{ marginBottom: "10px" }}>
//                         Quick Links
//                     </Typography>
//                     <Box>
//                         <Link href="#" sx={{ color: theme.palette.common.white, display: "block", marginBottom: "5px" }}>
//                             About Us
//                         </Link>
//                         <Link href="#" sx={{ color: theme.palette.common.white, display: "block", marginBottom: "5px" }}>
//                             Privacy Policy
//                         </Link>
//                         <Link href="#" sx={{ color: theme.palette.common.white, display: "block", marginBottom: "5px" }}>
//                             Terms & Conditions
//                         </Link>
//                     </Box>
//                 </Grid>

//                 {/* Center Section: Social Links */}
//                 <Grid item xs={12} sm={4}>
//                     <Typography variant="h6" sx={{ marginBottom: "10px" }}>
//                         Follow Us
//                     </Typography>
//                     <Box>
//                         <Link href="#" sx={{ color: theme.palette.common.white, marginRight: "15px" }}>
//                             <Typography>Facebook</Typography>
//                         </Link>
//                         <Link href="#" sx={{ color: theme.palette.common.white, marginRight: "15px" }}>
//                             <Typography>Twitter</Typography>
//                         </Link>
//                         <Link href="#" sx={{ color: theme.palette.common.white, marginRight: "15px" }}>
//                             <Typography>Instagram</Typography>
//                         </Link>
//                     </Box>
//                 </Grid>

//                 {/* Right Section: Contact */}
//                 <Grid item xs={12} sm={4}>
//                     <Typography variant="h6" sx={{ marginBottom: "10px" }}>
//                         Contact Us
//                     </Typography>
//                     <Typography sx={{ marginBottom: "5px" }}>Email: contact@example.com</Typography>
//                     <Typography>Phone: (123) 456-7890</Typography>
//                 </Grid>
//             </Grid>

//             <Typography variant="body2" sx={{ marginTop: "20px" }}>
//                 &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
//             </Typography>
//         </Box>
//     );
// };

// export default Footer;


import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTheme, Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import RibbonLogo from '../ribbonHeader/RibbonLogo';

const Footer = () => {
    const theme = useTheme();

    const links = ['Blog', 'Documentation', 'Careers', 'Sign up', 'Terms of use', 'Privacy policy'];
    const social = [
        {
            url: 'https://github.com/ninarada',
            label: 'Github',
            icon: <GitHubIcon sx={{ fontSize:'40px', color: theme.palette.brown[100]}}/>
        },
        {
            url: 'https://www.linkedin.com/in/ninarada/',
            label: 'LinkedIn',
            icon: <LinkedInIcon sx={{ fontSize:'45px', color: theme.palette.brown[100]}}/>
        },
    ];

    return (
        <Box>
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 5, sm: 3, md: 4 }}
            sx={{ 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '30px 20px',
                backgroundColor: theme.palette.primary.dark,
            }}
        >
            <Link to="/" style={{ textDecoration: "none" }}>
                <RibbonLogo />
            </Link>

            <Stack 
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >  
                {links.map((item, index) => (
                    <Typography key={index} sx={{
                        color: theme.palette.beige[100],
                        fontSize:'18px',
                        fontWeight: 400,
                        textAlign:'center',
                    }}>
                        {item}
                    </Typography>
                ))}
            </Stack>

            <Stack
                direction={'row'}
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                {social.map((item, index) => (
                    <Link key={index} to={item.url} style={{ display:'flex', justifyContent:'center'}}>
                        {item.icon}
                    </Link>
                    
                ))}
            </Stack>

        </Stack>

        <Box sx={{ 
            backgroundColor: '#8a4329', 
            display: 'flex', 
            justifyContent: 'center',
            padding:'20px 5px',
            color: theme.palette.brown[200],
        }}>
            <Typography>
                Copyright © 2024 Nina Rađa. All Rights Reserved.
            </Typography>
        </Box>
        </Box>
    );
}

export default Footer;