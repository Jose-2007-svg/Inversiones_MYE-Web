import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Checkout from './pages/Checkout';
import Producto from './pages/Producto'; // Importamos la nueva página

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Agregamos la ruta dinámica para cada producto */}
        <Route path="/producto/:id" element={<Producto />} /> 
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;