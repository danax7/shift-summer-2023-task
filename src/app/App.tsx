import { Routes, Route, BrowserRouter } from "react-router-dom";
import AffichePage from "../pages/AffichePage/ui/AffichePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<AffichePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
