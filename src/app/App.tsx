import { Routes, Route, BrowserRouter } from "react-router-dom";
import AffichePage from "../pages/AffichePage/ui/AffichePage";
import FilmPage from "../pages/FilmPage/ui/FilmPage";
import Header from "../components/Header/Header";
import AuthPage from "../pages/AuthPage/ui/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="" element={<AffichePage />} />
        <Route path="/films/:filmId" element={<FilmPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
