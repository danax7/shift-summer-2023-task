import { Routes, Route, BrowserRouter } from "react-router-dom";
import AffichePage from "../pages/AffichePage/ui/AffichePage";
import FilmPage from "../pages/FilmPage/ui/FilmPage";
import Header from "../components/Header/Header";
import AuthPage from "../pages/AuthPage/ui/AuthPage";
import ProfilePage from "../pages/Profile/ui/ProfilePage";
import { AuthProvider } from "../global/AuthContext/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="" element={<AffichePage />} />
          <Route path="/films/:filmId" element={<FilmPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
