import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Update from "./pages/Update";
import Add from "./pages/Add";
import Show from "./pages/Show";

//App.js => Main component for the application
//create routes for different pages
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/show/:productId" element={<Show />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;