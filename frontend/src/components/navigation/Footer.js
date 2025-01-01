import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTheme, Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import RibbonLogo from '../ribbonHeader/RibbonLogo';

const Footer = () => {
    const theme = useTheme();

    const links = ['Blog', 'Documentation', 'Careers', 'Sign Up', 'Terms of Use', 'Privacy Policy'];
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