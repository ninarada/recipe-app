import { 
    Box, 
    Divider, 
    Card,
    Typography, 
    useTheme, 
    List, ListItem, ListItemIcon, ListItemText,
    Stack, Chip,
    Rating,
    IconButton,
} from "@mui/material";
import CircleIcon from '@mui/icons-material/FiberManualRecord';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import { getInteraction, updateInteraction } from "../../service/userRecipeService";

const RecipeView = ({recipe}) => {
    const theme = useTheme();
    const [liked, setLiked] = useState(false); 
    const [bookmarked, setBookmarked] = useState(false);
    const [rating, setRating] = useState(0);
    const [error, setError] = useState(null);
    const [localLikeCounter, setLocalLikeCounter] = useState(0);
    const [localBookmarkCounter, setLocalBookmarkCounter] = useState(0);
    const [localRating, setLocalRating] = useState({ value: 0, count: 0 });


    useEffect(() => {
        const fetchUserInteraction = async () => {
            try {
                const data = await getInteraction(recipe._id);
                if (data !== undefined) {
                    setLiked(data.liked);
                    setBookmarked(data.bookmarked);
                    setRating(data.rating);
                }
            } catch (error) {
                setError(error.message);
            }
        }
        if (recipe?._id) {
            setLocalLikeCounter(recipe.like_counter);
            setLocalBookmarkCounter(recipe.bookmark_counter);
            setLocalRating((prevRating) => ({
                ...prevRating,
                value: recipe.average_rating.value, 
                count: recipe.average_rating.count, 
            }));
        
            fetchUserInteraction();
        }
    }, [recipe?._id]);

    const handleLike = async () => {
        try {
            await updateInteraction(recipe._id, 'liked', !liked);
            setLiked(!liked); 
            setLocalLikeCounter(liked ? localLikeCounter - 1 : localLikeCounter + 1);
        } catch (error) {
            console.error("Error liking the recipe:", error.message);
            setLiked(liked);
            setLocalLikeCounter(localLikeCounter);
        }
    };

    const handleBookmark = async () => {
        try {
            await updateInteraction(recipe._id, 'bookmarked', !bookmarked);
            setBookmarked(!bookmarked); 
            setLocalBookmarkCounter(bookmarked ? localBookmarkCounter - 1 : localBookmarkCounter + 1);
        } catch (error) {
            console.error("Error bookmarking the recipe:", error.message);
            setBookmarked(bookmarked);
            setLocalBookmarkCounter(localBookmarkCounter);
        }
    };

    const handleRating = async (event, newValue) => {
        setRating(newValue); 

        try {
            const response = await updateInteraction(recipe._id, 'rated', newValue);
            setLocalRating({
                value: response.average_rating?.value, 
                count: response.average_rating?.count, 
            });
        } catch (error) {
            console.error("Error rating the recipe:", error.message);
        }
    };

    return (
        <Card sx={{
            width: "80%",
            minHeight: "80vh",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingBottom: '30px',
          }}
        >
            <Box>
                <Box sx={{position:'relative',}}>
                    {recipe.photo && (
                        <Box sx={{display: 'flex', justifyContent: 'center', }}>
                            <img
                                src={recipe.photo}
                                alt={recipe.title}
                                loading="lazy"
                                style={{
                                    height: '300px',
                                    width: '100%',
                                    objectFit: 'cover', 
                                }}
                            />
                        </Box>
                    )}
                  <Card sx={{
                    position: 'absolute',
                    top: '110%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    padding:'20px 10px',
                    backgroundColor: '#FFFFFFF2',
                  }}>
                    <Box sx={{display:'flex', justifyContent:'space-between',}}>
                        <Box sx={{display:'flex', justifyContent:'space-between', gap:'10px',}}>
                            <Rating 
                                name="simple-controlled"
                                value={rating}
                                onChange={handleRating}
                            />
                            <Typography sx={{color: theme.palette.grey[600]}}>
                                {localRating.value || 0} ({localRating.count|| 0})
                            </Typography>
                        </Box>
                        <Box sx={{display:'flex', justifyContent:'space-between', gap:'20px',}}>
                            <Box sx={{display:'flex', gap:'7px', alignItems:'center'}}>
                                <Typography sx={{color: theme.palette.grey[600]}}>
                                    {localLikeCounter}
                                </Typography>
                                <IconButton onClick={handleLike}>
                                    <FavoriteIcon sx={{ color: liked ? theme.palette.deepOrange[200] : theme.palette.grey[600]  }}/>
                                </IconButton>
                            </Box>
                            <Box sx={{display:'flex', gap:'7px', alignItems:'center'}}>
                                <Typography sx={{color: theme.palette.grey[600]}}>
                                    {localBookmarkCounter}
                                </Typography>
                                <IconButton onClick={handleBookmark}>
                                    <BookmarkIcon sx={{ color: bookmarked ? theme.palette.orange[300] : theme.palette.grey[600]  }}/>
                                </IconButton>
                            </Box>
                        </Box>
                        
                    </Box>

                    <Typography sx={{
                        color: theme.palette.beige[300],
                        textTransform: 'uppercase',
                        textShadow: '0px 0.5px 1px rgba(0, 0, 0, 1)',
                        fontSize: '32px',
                        fontWeight: '800',
                        textAlign: 'center',
                    }}>
                        {recipe.title}
                    </Typography>
                
                    <Typography sx={{
                        color: theme.palette.brown[300],
                        fontSize: '26px',
                        fontWeight: '600',
                        textAlign: 'center',
                        paddingBottom: '20px',
                        fontStyle: 'italic',
                    }}>
                        {recipe.description}
                    </Typography>

                    <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:'30px'}}>
                        {recipe.time_consuming && (
                            <Box sx={{display:'flex', alignItems:'center'}}>
                                <HourglassBottomIcon sx={{ color: theme.palette.grey[500] }}/>
                                <Typography sx={{marginLeft:'10px', fontSize:'18px', textTransform:'lowercase', color: theme.palette.grey[600]}}>
                                    {recipe.time_consuming.value} {recipe.time_consuming.unit}
                                </Typography>
                            </Box>
                        )}
                        {recipe.difficulty && (
                        <Box sx={{display:'flex', alignItems:'center'}}>
                                <RestaurantIcon sx={{ color: theme.palette.grey[500] }}/>
                                <Typography sx={{marginLeft:'10px', fontSize:'20px', textTransform:'lowercase', color: theme.palette.grey[600]}}>
                                    {recipe.difficulty}
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    <Box sx={{display: 'flex', justifyContent: 'center', gap:'5px'}}>
                        <Typography>
                            made by 
                        </Typography>
                        <Typography sx={{fontStyle: 'italic', color: theme.palette.grey[700]}}>
                            username
                        </Typography>
                    </Box>
                  </Card>
                </Box>

                <Box sx={{marginBottom:'30px',marginTop:'200px', padding:'0px 70px'}}>
                    <Typography 
                        sx={{ fontWeight: '600', fontSize: '25px', color: theme.palette.brown[600]}}
                    >
                        Ingredients:
                    </Typography>
                    <List>
                        {recipe.ingredients && recipe.ingredients.map((ingredient, index)=> (
                            <ListItem key={index} sx={{ display: 'flex', alignItems: 'center', gap: '10px', width:'fit-content' }}>
                                <ListItemIcon sx={{ minWidth: '20px' }}>
                                    <CircleIcon sx={{ fontSize: '14px', color: 'primary.main' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={`${ingredient.quantity}${ingredient.unit ? ` ${ingredient.unit}` : ''} ${ingredient.name}`} 
                                    sx={{ fontWeight: '500' }} 
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>


                <Box sx={{marginBottom:'30px', padding:'0px 70px'}}>
                    <Typography 
                        sx={{ fontWeight: '600', fontSize: '25px', color: theme.palette.brown[600]}}
                    >
                        Steps
                    </Typography>
                    <List>
                    {recipe.instructions && recipe.instructions.map((step, index) => (
                        <ListItem key={index}>
                            <ListItemText 
                                primary={
                                    <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                                        <Typography 
                                            sx={{ 
                                                fontWeight: 'bold', 
                                                color: theme.palette.beige[800], 
                                                marginRight: '10px',
                                            }}
                                        >
                                            {index + 1}.
                                        </Typography>
                                        {step}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                    </List>
                </Box>
            </Box>

            <Divider />

            {recipe.tags && (
                <Box sx={{paddingTop: '20px'}}>
                    <Typography sx={{
                        textAlign:'center', 
                        color:theme.palette.grey[500], 
                        fontWeight:'600', 
                        fontStyle:'italic',
                        marginBottom:'10px'
                    }}>
                        tags
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent='center'>
                        {recipe.tags.map((tag, index)=> (
                        <Chip
                                key={index}
                                label={tag}
                                color="primary"
                                sx={{fontSize:'16px'}}
                            />
                        ))}
                    </Stack>
                </Box>
            )}

        </Card>
    )
}

export default RecipeView;