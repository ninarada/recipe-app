import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const theme = useTheme();

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        
        if (onSearch) {
            onSearch(newSearchTerm);
        }
    };

    const handleSearchSubmit = () => {
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    return (
        <Box sx={{
            display: "flex",
            justifyContent: 'center',
            padding: "30px 0px 60px 0px",
        }}>
            <TextField
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleSearchSubmit} sx={{ color: theme.palette.secondary.dark }}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                    sx: {
                        height: '40px',
                        padding: '5px',
                        borderRadius: '20px',
                        backgroundColor: theme.palette.primary.light,
                        boxShadow: '0px 0px 20px -4px rgba(0,0,0,0.3)',
                    }
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'transparent',
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.secondary.dark,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.secondary.dark,
                        },
                        '& .MuiInputBase-input': {
                            color: theme.palette.secondary.dark,
                        },
                        '& .MuiInputBase-input::placeholder': {
                            color: theme.palette.secondary.dark,
                            opacity: 1,
                        },
                    },
                }}
            />
        </Box>
    );
}

export default SearchBar;
