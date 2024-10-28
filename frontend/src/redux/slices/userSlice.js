import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from '../../service/userService';

const initialState = {
    userInfo: JSON.parse(localStorage.getItem('userData')) || null,
    loading: false,
    error: null,
};

// Async thunk for user registration
export const register = createAsyncThunk(
    'user/register',
    async ( {username, email, password}, { rejectWithValue }) => {
      try {
        const response = await registerUser(username, email, password);
        return response; 
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Registration failed');
      }
    }
);

// Async thunk for user login
export const login = createAsyncThunk(
    'user/login',
    async ({username, password}, { rejectWithValue }) => {
      try {
        const response = await loginUser(username, password);
        return response; 
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
      }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      logout: (state) => {
        state.userInfo = null; 
        state.error = null; 
        localStorage.removeItem('userData');
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(register.pending, (state) => {
          state.loading = true; 
          state.error = null; 
        })
        .addCase(register.fulfilled, (state, action) => {
          state.loading = false; 
          state.userInfo = action.payload; 
        })
        .addCase(register.rejected, (state, action) => {
          state.loading = false; 
          state.error = action.payload; 
        })
        .addCase(login.pending, (state) => {
          state.loading = true; 
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false; 
          state.userInfo = action.payload; 
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false; 
          state.error = action.payload; 
        });
    },
  });
  
  export const { logout } = userSlice.actions;
  export default userSlice.reducer;