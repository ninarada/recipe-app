import { Box, useTheme, Typography, Card, Tab, Tabs } from "@mui/material";
import Grid from '@mui/material/Grid2';
import ProfileInfo from "../components/profileInfo/ProfileInfo";
import { getMyRecipes } from "../service/recipeService";
import { getLikedRecipes, getBookmarkedRecipes, getRatedRecipes } from "../service/userRecipeService";
import { useEffect, useState } from "react";
import RecipeCard from "../components/recipeCard/RecipeCard";

const ProfilePage = () => {
    const theme = useTheme();
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("my recipes");

    const fetchFunctions = {
        "my recipes": getMyRecipes,
        "liked": getLikedRecipes,
        "bookmarked": getBookmarkedRecipes,
        "rated": getRatedRecipes,
    };

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const fetchFunction = fetchFunctions[selectedFilter];
                if (fetchFunction) {
                    const data = await fetchFunction();
                    setRecipes(data);
                }
            } catch (error) {
                setError(error.message);
            }
        };
        fetchRecipes();
    }, [selectedFilter]);

    const handleTabChange = (event, newValue) => {
        setSelectedFilter(newValue);
    };

    return (
        <Box sx={{
            flexGrow: 1,
            background: theme.gradients.linear,
            minHeight: '91.9vh',
            padding:'50px'
        }}>
        <Box  sx={{ display: 'flex', flexDirection:{ xs: 'column', md: 'row' }, justifyContent: 'space-evenly', gap: '20px'}}>

            <Box  >
                <ProfileInfo/>
            </Box>

            <Box sx={{width: '100%'}}>

                <Card sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    flexWrap: 'nowrap', 
                    overflowX: 'auto', 
                    width:'100%',
                    mb: 4,
                    padding:'7px 40px',
                    borderRadius:'40px',
                    gap:'30px',
                    alignItems:'center',
                }}>
                    <Tabs
                        value={selectedFilter}
                        onChange={handleTabChange}
                        textColor="primary"
                        indicatorColor="primary"
                        // orientation="vertical"
                        variant="scrollable"
                        scrollButtons="auto"
                        centered
                    >
                        <Tab label="My Recipes" value="my recipes" />
                        <Tab label="Liked" value="liked" />
                        <Tab label="Bookmarked" value="bookmarked" />
                        <Tab label="Rated" value="rated" />
                    </Tabs>
                </Card>

                <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                    {recipes && recipes.map((recipe) => (
                        <Grid item xs={12} sm={6} md={4} key={recipe._id}>
                            <RecipeCard
                                id={recipe._id}
                                title={recipe.title}
                                description={recipe.description}
                                author={recipe.author}
                                photo={recipe.photo}
                                bookmark={recipe.bookmark_counter}
                                like={recipe.like_counter}
                            />
                        </Grid>
                    ))}
                </Grid>

                {error && (
                    <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
                        {error}
                    </Typography>
                )}



                {/* <Box sx={{display:'flex', justifyContent:'center'}}>
                    <Card sx={{
                        display:'flex', 
                        width:'fit-content',
                        padding:'7px 40px',
                        borderRadius:'40px',
                        gap:'30px',
                        alignItems:'center',
                    }}>
                        <Typography>
                            my recipes
                        </Typography>
                        <Typography sx={{
                            border: 1,
                            borderRadius:'20px',
                            borderColor:theme.palette.grey[400],
                            padding:'5px 20px',
                        }}>
                            liked
                        </Typography>
                        <Typography>
                            bookmarked
                        </Typography>
                        <Typography>
                            rated
                        </Typography>
                    </Card>
                </Box>

                <Grid container spacing={3} sx={{ justifyContent: 'center'}}>
                    {myRecipes && myRecipes.map(recipe => (
                        <Grid item xs={12} sm={6} md={4} key={recipe._id}>
                            <RecipeCard 
                                key={recipe._id} 
                                id={recipe._id} 
                                title={recipe.title} 
                                description={recipe.description} 
                                author={recipe.author} 
                                photo={recipe.photo}
                                bookmark={recipe.bookmark_counter}
                                like={recipe.like_counter}
                            />
                        </Grid>
                    ))}
                </Grid> */}

            </Box>

        </Box>
            
        </Box>
    )
}

export default ProfilePage;