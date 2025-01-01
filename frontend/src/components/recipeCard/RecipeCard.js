import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getInteraction } from '../../service/userRecipeService';

const RecipeCard = ({ id, title, author, photo, description, bookmark, like }) => {
    const theme = useTheme();
    const [error, setError] = useState(null); 
    const [interaction, setInteraction] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const fetchInteraction = async () => {
            try {
                const data = await getInteraction(id);
                setInteraction(data);
                setIsBookmarked(data.bookmarked);
                setIsLiked(data.liked);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchInteraction();
    }, []);

    return (
      <Link to={`/recipes/${id}`}  style={{ textDecoration: 'none', color: 'inherit', cursor:'pointer' }}> 
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
            transition: 'transform 0.3s ease', 
            '&:hover': {
                transform: 'scale(1.05)', 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', 
            },
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
                <BookmarkIcon sx={{ 
                    color: isBookmarked ? theme.palette.warning.light : theme.palette.grey[50], 
                    filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.7))' 
                }}/>
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
                    <Box sx={{display:'flex',  fontSize: '17px'}}>
                        <Typography sx={{ color: theme.palette.grey[700], alignContent:'center', paddingTop:'1px' }}>
                            By&nbsp;
                        </Typography>
                        <Link style={{ textDecoration: "none", color: theme.palette.grey[500],}}>
                            {author.username}
                        </Link>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography sx={{ color: theme.palette.text.secondary }}>
                            {like}
                        </Typography>
                        <FavoriteIcon sx={{ color: isLiked ? theme.palette.error.dark : theme.palette.grey[500] }}/>
                    </Box>
                </Box>
            </CardContent>
        </Card> 
      </Link>
    );
};

export default RecipeCard;
