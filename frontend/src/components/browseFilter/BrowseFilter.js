import { Box, Menu, MenuItem, Typography, useTheme, Divider } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { addTag, removeTag, setFilteredRecipes } from "../../redux/slices/browseSlice";
import { useState } from "react";

import SecondaryButton from "../buttons/secondaryButton";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchBar from "../searchBar/SearchBar";

const BrowseFilter = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.browse.recipes); 
    const allTags = useSelector((state) => state.browse.allTags)
    const selectedTags = useSelector((state) => state.browse.selectedTags); 
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [searchedTags, setSearchedTags] = useState(allTags);

    const filterTypesOptions = ['breakfast', 'lunch', 'dinner', 'dessert'];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickTag = (item) => {
        if (!selectedTags.includes(item)) {
            dispatch(addTag(item));
        } else {
            dispatch(removeTag(item)); 
        }

        const updatedTags = selectedTags.includes(item)
            ? selectedTags.filter(tag => tag !== item) 
            : [...selectedTags, item]; 
    
        const filtered = recipes.filter(recipe =>
            updatedTags.every(tag =>
                recipe.tags.some(recipeTag =>
                    recipeTag.toLowerCase() === tag.toLowerCase()
                )
            )
        );
    
        dispatch(setFilteredRecipes(filtered));
    };

    const handleSearchFilter = (searchTerm) => {
        const filtered = allTags.filter(tag => tag.includes(searchTerm.toLowerCase()));
        setSearchedTags(filtered);
    };

    return(
        <Box>
            <SecondaryButton 
                text={'FILTER'} 
                fontsize={'14'} 
                onClick={handleClick}
                icon={selectedTags.length>0 ? 
                    <FilterAltIcon sx={{fontSize:'18px', color: theme.palette.warning.dark, marginLeft:'10px', }} /> 
                : 
                    <FilterAltOffIcon sx={{fontSize:'18px', marginLeft:'10px', }}/>
            }/>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiPaper-root':{
                        backgroundColor:'rgba(255, 255, 255, 0.95)',
                        width:'400px',
                        marginTop:'5px',
                    },
                    '& .MuiMenu-list': {
                        display:'flex',
                        flexWrap:'wrap',
                        gap:'10px',
                        justifyContent:'center',
                    },
                }}
              >
                <Box sx={{width:'100%', display:'flex', flexDirection:'column', gap:'10px'}}>
                    <Typography sx={{color:theme.palette.grey[600], fontStyle:'italic', cursor:'default' }}>filter by type:</Typography>
                    <Box sx={{ display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                        {filterTypesOptions.map((item, index)=> (
                            <MenuItem
                                key={index} 
                                onClick={() => handleClickTag(item)} 
                                disableRipple  
                                sx={{
                                    backgroundColor: selectedTags.includes(item) ? theme.palette.grey[700] : theme.palette.grey[300],
                                    color: selectedTags.includes(item) ? theme.palette.grey[50] : theme.palette.grey[800],
                                    borderRadius: "20px",
                                    padding: "5px 10px", 
                                    margin:'5px',
                                    display:'flex',
                                    justifyContent:'center',
                                    width:'fit-content',
                                    cursor: selectedTags.includes(item) ? 'default' : 'pointer',
                                    '&:hover': {
                                            backgroundColor: selectedTags.includes(item) ? theme.palette.grey[700]  : theme.palette.grey[100],                
                                            color: selectedTags.includes(item) ? theme.palette.grey[50] : theme.palette.grey[800], 
                                        }
                                }}
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </Box>
                    <Divider />
                    <Typography sx={{color:theme.palette.grey[600], fontStyle:'italic', cursor:'default' }}>search tags:</Typography>
                    <Box sx={{padding:'20px 0px'}}>
                        <SearchBar onSearch={handleSearchFilter} widthMD={20} placeholder={"search tags..."}/>
                    </Box>

                    <Divider />
                    <Typography  sx={{color:theme.palette.grey[600], fontStyle:'italic', cursor:'default' }}>popular tags:</Typography>
                    <Box  sx={{ width:'100%', display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                        {searchedTags.length>0 && searchedTags
                            .filter(tag => tag !== 'breakfast' && tag !== 'dinner' && tag !== 'lunch' && tag !== 'dessert')
                            .slice(0, 10)
                            .map((item,index)=>(
                            <MenuItem 
                                key={index} 
                                onClick={() => handleClickTag(item)} 
                                disableRipple  
                                sx={{
                                    backgroundColor: selectedTags.includes(item) ? theme.palette.grey[700] : theme.palette.grey[300],
                                    color: selectedTags.includes(item) ? theme.palette.grey[50] : theme.palette.grey[800],
                                    borderRadius: "20px",
                                    padding: "5px 10px", 
                                    margin:'5px',
                                    display:'flex',
                                    justifyContent:'center',
                                    width:'fit-content',
                                    cursor: selectedTags.includes(item) ? 'default' : 'pointer',
                                    '&:hover': {
                                            backgroundColor: selectedTags.includes(item) ? theme.palette.grey[700]  : theme.palette.grey[100],                
                                            color: selectedTags.includes(item) ? theme.palette.grey[50] : theme.palette.grey[800], 
                                        }
                                }}
                            >
                                {item}
                            </MenuItem>
                        ))} 
                    </Box>
                </Box>
              </Menu>
        </Box>
    );
};

export default BrowseFilter;