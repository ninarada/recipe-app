import { Avatar, Box, Card, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { getMyProfile } from "../../service/userService";
import PrimaryButton from "../buttons/primaryButton";
import SecondaryButton from "../buttons/secondaryButton";

const ProfileInfo = ({ onEdit, onChangePassword }) => {
    const theme = useTheme();
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState(null);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const data = await getMyProfile();
                setUserInfo(data);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchMyProfile();
    }, []);

    if (error) return <div>Error: {error}</div>;

    return (
        <Card sx={{
            minWidth: '300px',
            display: 'flex',
            flexDirection: isExtraSmallScreen ? "column" : isSmallScreen ? "row" : "column",
            justifyContent: "center",
            padding: '20px',
            gap: "30px",
          }}
        >
            <Box sx={{display:'flex', justifyContent:'center'}}>
                 {/* <Avatar
                    alt="icon.jpg"
                    src="https://img.buzzfeed.com/buzzfeed-static/static/2019-10/30/18/asset/acc977146081/sub-buzz-3295-1572460027-1.png?resize=990:1206"
                    sx={{ width: 150, height: 150, boxShadow: '0px 1px 8px rgba(0, 0, 0, 1)', }}
                /> */}
                <Avatar
                    src={userInfo.photo}
                    sx={{ width: 150, height: 150, boxShadow: '0px 1px 8px rgba(0, 0, 0, 1)', }}
                /> 
            </Box>
            
            <Box sx={{padding:'0px 20px'}}>
                <Box sx={{display:'flex', justifyContent:'space-between'}}>
                    <Typography sx={{fontWeight:'600', paddingBottom:'10px'}}>
                        username:
                    </Typography>
                    <Typography>
                        {userInfo.username}
                    </Typography>
                </Box>

                <Box sx={{display:'flex', justifyContent:'space-between'}}>
                    <Typography sx={{fontWeight:'600'}}>
                        email:
                    </Typography>
                    <Typography>
                    {userInfo.email}
                    </Typography>
                </Box>

                <Box sx={{display:'flex', flexDirection: 'column', gap: '10px', padding:'20px 10px'}}>
                    <PrimaryButton text={'edit profile'} onClick={onEdit}/>
                    <SecondaryButton text={'change password'} onClick={onChangePassword}/>
                </Box>
            </Box>

            

        </Card>
    )
}

export default ProfileInfo;