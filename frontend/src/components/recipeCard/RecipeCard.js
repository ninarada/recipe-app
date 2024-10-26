import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const RecipeCard = ({ id, title, author, photo, description, bookmark, like }) => {
    const theme = useTheme();

    return (
        <Card sx={{ 
            maxWidth: 300, 
            minWidth: 300, 
            m: 2, 
            padding: '12px', 
            height: '300px', 
            display: 'flex', 
            flexDirection: 'column', 
            borderRadius: '16px',
            position: 'relative',
            backgroundColor: "white",
            boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.2)',
        }}>
            <Box sx={{
                display: 'flex', 
                position: 'absolute', 
                top: '20px', 
                right: '20px', 
                flexDirection: 'row', 
                justifyContent: 'end', 
                alignItems: 'center',
            }}>
                <BookmarkIcon sx={{ color: theme.palette.grey[50], }}/>
            </Box>
            <CardMedia
                component="img"
                height="140"
                image={photo}
                alt={'img'}
                sx={{
                    borderRadius: "12px",
                }}
            />
            <CardContent sx={{
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                borderRadius: '16px',
                padding: '10px 5px', 
                '&:last-child': { paddingBottom: '0px' },
            }}>
                <Box>
                    <Typography sx={{
                        color: theme.palette.secondary.dark,
                        fontSize: '18px',
                        fontWeight: '600',
                    }}>
                        {title}
                    </Typography>
                    <Typography sx={{ color: theme.palette.text.secondary }}>
                        {description}
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    paddingBottom: '10px', 
                    alignItems: 'center',
                }}>
                    <Box sx={{display:'flex'}}>
                        <Typography sx={{ color: theme.palette.grey[700] }}>
                            By&nbsp;
                        </Typography>
                        <Link style={{ textDecoration: "none", color: theme.palette.grey[500] }}>
                            {author}
                        </Link>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography sx={{ color: theme.palette.text.secondary }}>
                            {like}
                        </Typography>
                        <FavoriteIcon sx={{ color: theme.palette.deepOrange[200] }}/>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default RecipeCard;
