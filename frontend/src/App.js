import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import NavBar from "./components/navigation/NavBar";
import {
  BrowsePage,
  CreateRecipePage,
  HomePage,
  ProfilePage,
  SignInPage,
  ViewRecipePage
} from './pages';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import store from './redux/store';
import Footer from "./components/navigation/Footer";

function PrivateRoute({ element }) {
  const isLoggedIn = useSelector((state) => state.user.userInfo !== null);
  return isLoggedIn ? element : <Navigate to="/signin" />;
}

function App() {  
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<PrivateRoute element={<CreateRecipePage />} />} /> 
            <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} /> 
            <Route path="/recipes" element={<PrivateRoute element={<BrowsePage />} />} />
            <Route path="/recipes/:id" element={<ViewRecipePage />} />
            <Route path="/signin" element={<SignInPage />} />

        </Routes>
      </Router>
      </ThemeProvider>
      </Provider>
  );
}

export default App;
