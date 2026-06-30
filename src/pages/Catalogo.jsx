import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Catalogo = () => {
  const [allSneakers, setAllSneakers] = useState([]);
  
  // Estados para los filtros
  const [search, setSearch] = useState('');
  const [categoria, setCategoria] = useState('');
  const [talla, setTalla] = useState('');
  const [color, setColor] = useState('');
  
  const [loading, setLoading] = useState(true);

  const fetchCatalogo = async () => {
    try {
      const response = await fetch('https://inversiones-mye.onrender.com/api/zapatillas');
      const data = await response.json();
      setAllSneakers(data);
    } catch (error) {
      console.error('Error al cargar catálogo:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogo();
    const socket = io('https://inversiones-mye.onrender.com');
    socket.on('inventario_cambio', () => fetchCatalogo());
    return () => socket.disconnect();
  }, []);

  // Extraer valores únicos dinámicamente para los menús desplegables
  const categoriasUnicas = [...new Set(allSneakers.map(s => s.categoria))].filter(Boolean).sort();
  const coloresUnicos = [...new Set(allSneakers.flatMap(s => s.colores || []))].sort();
  const tallasUnicas = [...new Set(allSneakers.flatMap(s => s.tallas?.map(t => typeof t === 'object' ? String(t.talla) : String(t)) || []))].sort((a,b) => Number(a) - Number(b));

  // Aplicar todos los filtros al mismo tiempo
  const filtered = allSneakers.filter((s) => {
    const matchSearch = s.nombre.toLowerCase().includes(search.toLowerCase()) || s.codigo.toLowerCase().includes(search.toLowerCase());
    const matchCategoria = !categoria || s.categoria === categoria;
    const matchColor = !color || (s.colores && s.colores.includes(color));
    
    const matchTalla = !talla || (s.tallas && s.tallas.some(t => {
        const tStr = typeof t === 'object' ? String(t.talla) : String(t);
        return tStr === talla;
    }));

    return matchSearch && matchCategoria && matchColor && matchTalla;
  });

  const limpiarFiltros = () => {
      setSearch('');
      setCategoria('');
      setTalla('');
      setColor('');
  };

  return (
    <div className="bg-gray-50 min-h-screen text-black font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-28 sm:pt-36 pb-20">
        
        {/* Cabecera */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none mb-3 text-black">Nuestro <span className="text-gray-500">Catálogo</span></h1>
          <p className="text-gray-600 text-sm max-w-lg font-medium">Filtra por talla, color o categoría y encuentra tu par ideal.</p>
        </div>

        {/* Barra de Filtros (Estilo E-commerce Avanzado) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 bg-white p-4 rounded-3xl border border-gray-200 shadow-sm">
          <div className="relative">
            <input type="text" placeholder="Buscar modelo o código..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-premium w-full text-sm" />
          </div>
          
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="input-premium w-full text-sm font-bold text-gray-600">
            <option value="">Todas las Categorías</option>
            {categoriasUnicas.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select value={talla} onChange={(e) => setTalla(e.target.value)} className="input-premium w-full text-sm font-bold text-gray-600">
            <option value="">Cualquier Talla</option>
            {tallasUnicas.map(t => <option key={t} value={t}>Talla {t}</option>)}
          </select>

          <select value={color} onChange={(e) => setColor(e.target.value)} className="input-premium w-full text-sm font-bold text-gray-600">
            <option value="">Cualquier Color</option>
            {coloresUnicos.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Resultados y Limpiar Filtros */}
        <div className="flex justify-between items-center mb-8 px-2">
            <p className="text-xs uppercase tracking-widest font-bold text-gray-500">Mostrando {filtered.length} modelos</p>
            {(search || categoria || talla || color) && (
                <button onClick={limpiarFiltros} className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-widest transition-colors">
                    ✕ Limpiar Filtros
                </button>
            )}
        </div>

        {/* Rejilla de Productos */}
        {loading ? (
          <p className="text-center font-bold text-gray-500 py-20">Cargando inventario...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
            <p className="text-gray-500 font-bold uppercase tracking-widest">No encontramos zapatillas con esos filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item) => (
              <Link to={`/producto/${item.id}`} key={item.id} className="group rounded-3xl overflow-hidden bg-white border border-gray-200 hover:border-black transition-all duration-500 shadow-sm hover:shadow-lg">
                <div className="relative p-6 sm:p-8 flex justify-center items-center overflow-hidden bg-gray-50">
                  <img src={item.foto_principal} alt={item.nombre} className="w-full h-44 sm:h-48 object-contain img-zoom drop-shadow-md" />
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full shadow-lg">Ver Detalle</span>
                  </div>
                </div>
                <div className="p-5 pt-4">
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1 font-bold">{item.categoria}</p>
                  <h4 className="text-sm font-bold text-black leading-snug line-clamp-2 mb-3">{item.nombre}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-white bg-[#25D366] px-3 py-1.5 rounded-full uppercase tracking-widest">Consultar</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default Catalogo;