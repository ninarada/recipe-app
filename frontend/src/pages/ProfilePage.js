import { Box, useTheme, Typography, Card, Tab, Tabs } from "@mui/material";
import Grid from '@mui/material/Grid2';
import ProfileInfo from "../components/profileInfo/ProfileInfo";
import { getMyRecipes, getLikedRecipes, getBookmarkedRecipes, getRatedRecipes } from "../service/recipeService";
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
        <Grid 
            container 
            spacing={2} 
            sx={{ justifyContent: 'space-evenly'}}
        >

            <Grid item 
                xs={12} 
                md={3} 
                sx={{
                    order: { xs: 0, md: 0 }, 
                }} 
            >
                <ProfileInfo/>
            </Grid>

            <Grid item 
                xs={12} 
                md={9} 
                sx={{
                    order: { xs: 1, md: 1 }, 
                }}
            >

                <Card sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
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

            </Grid>

        </Grid>
            
        </Box>
    )
}

export default ProfilePage;