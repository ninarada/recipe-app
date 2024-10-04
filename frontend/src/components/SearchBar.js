import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = React.useState('');
  
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
                      <IconButton onClick={handleSearchSubmit} sx={{ color: 'var(--secondary-dark-color)' }}>
                      <SearchIcon />
                      </IconButton>
                  </InputAdornment>
                  ),
                  sx: {
                      height: '40px',
                      padding: '5px',
                      borderRadius: '20px',
                      backgroundColor: 'var(--primary-light2-color)',
                      boxShadow: '0px 0px 20px -4px rgba(0,0,0,0.3);',
                  }
              }}
              sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {   
                      borderColor: 'transparent', 
                    },
                    '&:hover fieldset': {     
                      borderColor: 'var(--secondary-dark-color)', 
                    },
                    '&.Mui-focused fieldset': {   
                      borderColor: 'var(--secondary-dark-color)', 
                    },
                    '& .MuiInputBase-input': {
                      color: 'var(--secondary-dark-color)', 
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: 'var(--secondary-dark-color)', 
                      opacity: 1, 
                    },
                  },
              }}
          />
          </Box>
      );
  }
  
  export default SearchBar;