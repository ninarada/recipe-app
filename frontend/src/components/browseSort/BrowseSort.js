import { Box, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import SecondaryButton from "../buttons/secondaryButton";
import { setFilteredRecipes } from "../../redux/slices/browseSlice";
import { useState } from "react";

const BrowseSort = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.browse.recipes); 
    const [chosenSort, setChosenSort] = useState('Most Popular'); 
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickMenuItem = (item) => {
        setAnchorEl(null);
        setChosenSort(item.label);
        sortFunction(item.action); 
    };

    const sortFunction = (name) => {
        let sorted;
        switch (name) {
            case 'sortByMostLiked':
                sorted = [...recipes].sort((a, b) => b.like_counter - a.like_counter);
                break;
            case 'sortByLeastLiked':
                sorted = [...recipes].sort((a, b) => a.like_counter - b.like_counter);
                break;
            case 'sortByHighestRated':
                sorted = [...recipes].sort((a, b) => b.average_rating.value - a.average_rating.value); 
                break;
            case 'sortByLowestRated':
                sorted = [...recipes].sort((a, b) => a.average_rating.value - b.average_rating.value); 
                break;
            case 'sortByNewestFirst':
                sorted = [...recipes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
                break;
            case 'sortByOldestFirst':
                sorted = [...recipes].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            default:
                break;
        }
        dispatch(setFilteredRecipes(sorted));
    }

    const sortOptions = [
        { label: 'Most Popular', action: 'sortByMostLiked' },
        { label: 'Least Popular', action: 'sortByLeastLiked' },
        { label: 'Highest Rated', action: 'sortByHighestRated' },
        { label: 'Lowest Rated', action: 'sortByLowestRated' },
        { label: 'Newest First', action: 'sortByNewestFirst' },
        { label: 'Oldest First', action: 'sortByOldestFirst' },
    ];

    return(
        <Box>
            <SecondaryButton text={`SORT BY: ${chosenSort}`} fontsize={'15'} onClick={handleClick}/>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiPaper-root':{
                        backgroundColor:'rgba(255, 255, 255, 0.9)',
                    },
                    marginTop:'5px'
                }}
                anchorOrigin={{
                    vertical: 'bottom',  
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',     
                    horizontal: 'center', 
                }}
            >
                {sortOptions.map((item,index)=>(
                    <MenuItem 
                        key={index} 
                        onClick={() => handleClickMenuItem(item)} 
                        disableRipple  
                        sx={{justifyContent:'center', width:'200px',}}
                    >
                        {item.label}
                    </MenuItem>
                ))} 
            </Menu>
        </Box>
    );
};

export default BrowseSort;    