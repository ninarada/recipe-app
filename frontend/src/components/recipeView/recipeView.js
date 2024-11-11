import { 
    Box, 
    Divider, 
    Card,
    Typography, 
    useTheme, 
    List, ListItem, ListItemIcon, ListItemText,
    Stack, Chip,
    Rating,
} from "@mui/material";
import CircleIcon from '@mui/icons-material/FiberManualRecord';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';


//TODO: dodaj na hover usernama preview profila korisnika 

const RecipeView = ({recipe}) => {
    const theme = useTheme();

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
                                value={recipe.average_rating}
                                // onChange={(event, newValue) => {
                                // setValue(newValue);
                                // }}
                            />
                            <Typography sx={{color: theme.palette.grey[600]}}>
                                {recipe.average_rating}
                            </Typography>
                        </Box>
                        <Box sx={{display:'flex', justifyContent:'space-between', gap:'20px',}}>
                            <Box sx={{display:'flex', gap:'7px'}}>
                                <Typography sx={{color: theme.palette.grey[600]}}>
                                    {recipe.like_counter}
                                </Typography>
                                <FavoriteIcon sx={{ color: theme.palette.deepOrange[200] }}/>
                            </Box>
                            <Box sx={{display:'flex', gap:'7px'}}>
                                <Typography sx={{color: theme.palette.grey[600]}}>
                                    {recipe.bookmark_counter}
                                </Typography>
                                <BookmarkIcon sx={{ color: theme.palette.deepOrange[200] }}/>
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