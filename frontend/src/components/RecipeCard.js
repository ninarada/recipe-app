import { Card, CardMedia, CardContent, Typography, Box, IconButton  } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';

const RecipeCard = ({ id, title, author, photo, description, bookmark, like }) => {
    return (
        <Card sx={{ 
            maxWidth: 300, 
            minWidth: 300, 
            m: 2, 
            padding: '12px', 
            height: '300px', 
            display: 'flex', 
            flexDirection:'column', 
            borderRadius:'16px',
            position: 'relative',
        }}>
            <Box sx={{display: 'flex', position:'absolute', top:'10px', right:'10px', flexDirection: 'row', justifyContent: 'end', alignItems: 'center'}}>
                <IconButton sx={{color: 'var( --secondary-light-color)'}}><BookmarkIcon /></IconButton>
            </Box>
            <CardMedia
                component="img"
                height="140"
                image={photo}
                alt={'img'}
                sx={{
                    borderRadius:"12px",
                }}
            />
            <CardContent sx={{
                flex: 1, display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                borderRadius:'16px',
                '&:last-child': { 
                    paddingBottom: '0px', 
                },
                padding: '10px 5px ', 
            }}>
                <Box >
                    <Typography sx={{
                        color: 'var(--secondary-darker-color)',
                        fontSize: '18px',
                        fontWeight:'600',
                    }}>
                        {title}
                    </Typography>
                    <Typography sx={{ color: 'var(--text-secondary-color)'}}>{description}</Typography>
                </Box>

                <Box sx={{display:'flex', justifyContent: 'space-between', paddingBottom: '10px', alignItems: 'center'}}>
                    <Typography sx={{ color: 'var(--text-secondary-color)'}}>By {author}</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Typography sx={{ color: 'var(--text-secondary-color)'}}>{like}</Typography>
                        <IconButton sx={{color: 'var(--secondary-dark-color)'}}><FavoriteIcon /></IconButton>
                    </Box>
                    
                </Box>
            </CardContent>
        </Card>
    )
}

export default RecipeCard;