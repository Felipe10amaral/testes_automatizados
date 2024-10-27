import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Cliente } from "./pages/Cliente/Cliente";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar-cliente" element={<Cliente />} />
      </Routes>
    </Router>
  );
}