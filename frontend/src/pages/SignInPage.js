import { Box, Card, Typography } from "@mui/material";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LogIn from "../components/signin/LogIn";
import SignUp from "../components/signin/SignUp";


const SignInPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleSwitch = () => {
        setIsLogin((prev) => !prev);
    };

        // Animation variants
    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };
    
    return(
        <Box sx={{
                minHeight: '100vh',
                background: 'var(--linear-g)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
        }}>
                <motion.div
                    key={isLogin ? 'login' : 'signup'}
                    custom={isLogin ? 1 : -1}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={variants}
                    transition={{ type: 'spring', stiffness: 200, damping: 60 }}
                >
                    {isLogin ? <LogIn onSwitch={handleSwitch} /> : <SignUp onSwitch={handleSwitch} />}
                </motion.div>

        </Box>
    );
}

export default SignInPage;