import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateRecipePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/recipes" element={<BrowsePage />} />
            <Route path="/signin" element={<SignInPage />} />

        </Routes>
      </Router>
      </ThemeProvider>
  );
}

export default App;
