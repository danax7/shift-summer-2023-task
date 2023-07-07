import { Routes, Route, BrowserRouter } from "react-router-dom";
import AffichePage from "../pages/AffichePage/ui/AffichePage";
import FilmPage from "../pages/FilmPage/ui/FilmPage";
import Header from "../components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<AffichePage />} />
        <Route path="/films/:filmId" element={<FilmPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
