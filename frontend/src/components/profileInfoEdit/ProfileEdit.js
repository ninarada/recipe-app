import { Avatar, Box, Card, Typography, useTheme, useMediaQuery, TextField, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import { getMyProfile, saveProfile } from "../../service/userService";
import PrimaryButton from "../buttons/primaryButton";
import SecondaryButton from "../buttons/secondaryButton";

const ProfileEdit = ({ onCancel, onSave }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [selectedImage, setSelectedImage]= useState("");
    
    useEffect(() => {
        const fetchMyProfile = async () => {
            const data = await getMyProfile();
            setUsername(data.username);
            setEmail(data.email);
            setSelectedImage(data.photo)
        }
        fetchMyProfile();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const fileUrl = URL.createObjectURL(file);
          setSelectedImage(fileUrl);
        }
    };

    const handleEditClick = () => {
        document.getElementById('photo-input').click();
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0]; 
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImage(reader.result);
          };
          reader.readAsDataURL(file); 
        }
    };

    const handleSave = async () => {
        await saveProfile(username, email, selectedImage);
        onSave && onSave();
        alert("Profile saved successfully!");
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
            <Box sx={{display:'flex', justifyContent:'center', position: 'relative'}}>
                <Avatar
                    src={selectedImage}
                    sx={{ width: 150, height: 150, boxShadow: '0px 1px 8px rgba(0, 0, 0, 1)', }}
                /> 
                <IconButton 
                    onClick={handleEditClick} 
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: isSmallScreen ? 0 : 50,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                            backgroundColor: 'white',
                            opacity: 0.8,  
                            boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.3)', 
                        }
                    }}
                >
                    <EditIcon sx={{ color: '#000' }} />
                </IconButton>

                <input
                    id="photo-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                />

            </Box>
            <Box sx={{display:'flex', flexDirection: 'column', gap: '20px'}}>
                <TextField 
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                 <TextField 
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Box sx={{display:'flex', justifyContent:'space-between', padding:'20px 0px'}}>
                    <SecondaryButton text={'cancel'} onClick={onCancel}/>
                    <PrimaryButton text={'save'} onClick={handleSave}/>
                </Box>
            </Box>
        </Card>
    )
}

export default ProfileEdit;