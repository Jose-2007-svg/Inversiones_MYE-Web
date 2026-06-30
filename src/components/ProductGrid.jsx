import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = () => {
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    const fetchGrid = async () => {
      try {
        const response = await fetch('https://inversiones-mye.onrender.com/api/zapatillas');
        const data = await response.json();
        setSneakers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGrid();
  }, []);

  if (sneakers.length < 2) return null; // Ocultamos el grid si hay muy pocos productos

  const featured = sneakers[0];
  const grid = sneakers.slice(1, 9);

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mb-3">Colección</p>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none text-black">
              También te puede <span className="text-gray-500">gustar</span>
            </h3>
          </div>
          <Link to="/catalogo" className="text-black hover:text-gray-600 text-sm font-semibold uppercase tracking-widest transition-colors flex items-center gap-2 group">
            Ver todo <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Destacado */}
          <Link to={`/producto/${featured.id}`} className="lg:col-span-8 group relative rounded-3xl overflow-hidden bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-500">
            <div className="flex flex-col md:flex-row items-center p-8 sm:p-12 gap-8">
              <div className="flex-1 overflow-hidden flex justify-center">
                <img src={featured.foto_principal} alt={featured.nombre} className="w-full max-w-md h-64 sm:h-80 object-contain img-zoom drop-shadow-xl" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest mb-4">Destacado</span>
                <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-2">{featured.categoria}</p>
                <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight mb-3 text-black">{featured.nombre}</h4>
                <p className="text-[#25D366] text-xl font-black mb-6">CONSULTAR</p>
                <span className="btn-accent text-xs py-3 px-8">Ver Producto →</span>
              </div>
            </div>
          </Link>

          {/* Columna lateral */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {grid.slice(0, 2).map((item) => (
              <Link to={`/producto/${item.id}`} key={item.id} className="group flex-1 rounded-3xl overflow-hidden bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-500 p-6 flex items-center gap-5">
                <div className="w-28 h-28 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-2xl bg-white">
                  <img src={item.foto_principal} alt={item.nombre} className="w-full h-full object-contain img-zoom p-2" />
                </div>
                <div className="min-w-0">
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">{item.categoria}</p>
                  <h4 className="text-sm font-bold text-black leading-snug line-clamp-2 mb-2">{item.nombre}</h4>
                  <span className="text-sm font-black text-[#25D366]">CONSULTAR</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Fila inferior */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {grid.slice(2, 8).map((item, index) => (
            <Link to={`/producto/${item.id}`} key={item.id} className="group rounded-3xl overflow-hidden bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-500">
              <div className="relative p-6 sm:p-8 flex justify-center items-center overflow-hidden bg-white">
                <img src={item.foto_principal} alt={item.nombre} className="w-full h-44 sm:h-52 object-contain img-zoom drop-shadow-md" />
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">Ver Detalle</span>
                </div>
              </div>
              <div className="p-5 pt-3">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">{item.categoria}</p>
                <h4 className="text-sm font-bold text-black leading-snug line-clamp-2">{item.nombre}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;