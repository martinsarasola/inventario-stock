import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="inventory" element={<Inventory />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
