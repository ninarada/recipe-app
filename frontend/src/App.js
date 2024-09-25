import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import CreateRecipePage from "./pages/CreateRecipePage";
import NavBar from "./components/navigation/NavBar";
import BrowsePage from "./pages/BrowsePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
      <Router>
        <NavBar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateRecipePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/recipes" element={<BrowsePage />} />
        </Routes>
      </Router>
  );
}

export default App;
