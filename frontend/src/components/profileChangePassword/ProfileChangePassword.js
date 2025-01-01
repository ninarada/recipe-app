import { Box, Card, Typography, useTheme, useMediaQuery, TextField, } from "@mui/material";
import { useState } from "react";
import { saveProfilePassword } from "../../service/userService";
import PrimaryButton from "../buttons/primaryButton";
import SecondaryButton from "../buttons/secondaryButton";

const ProfileChangePassword = ({ onCancel, onSave }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSavePassword = async () => {
        const result = await saveProfilePassword(currentPassword, newPassword, confirmPassword);
        if (result.success) {
            onSave && onSave();
            alert("Profile saved successfully!");
        }
    };
    
    return(
        <Card sx={{
            minWidth: '300px',
            display: 'flex',
            flexDirection: isExtraSmallScreen ? "column" : isSmallScreen ? "row" : "column",
            justifyContent: "center",
            padding: '20px',
            gap: "30px",
        }}>
            <Box sx={{display:'flex', flexDirection: 'column', gap: '20px'}}>
                <Typography>Change Password</Typography>
                <TextField
                    label="Current Password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Confirm New Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                />

                <Box sx={{display:'flex', justifyContent:'space-between', padding:'20px 0px'}}>
                    <SecondaryButton text={'cancel'} onClick={onCancel}/>
                    <PrimaryButton text={'save'} onClick={handleSavePassword}/>
                </Box>
            </Box>
        </Card>
    )
}

export default ProfileChangePassword;