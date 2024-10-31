import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Cliente } from "./pages/Cliente";
import { Usuario } from "./pages/Usuario";
import { Nota } from "./pages/Nota";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar-cliente" element={<Cliente />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/nota" element={<Nota />} />
      </Routes>
    </Router>
  );
}