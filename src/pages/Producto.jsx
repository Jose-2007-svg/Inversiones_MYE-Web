import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Producto = () => {
  const { id } = useParams();
  const [zapatilla, setZapatilla] = useState(null);
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [talla, setTalla] = useState('');
  const [imagenActiva, setImagenActiva] = useState('');
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); 
    setLoading(true);

    const fetchProductoYRecomendaciones = async () => {
      try {
        const respuesta = await fetch(`https://inversiones-mye.onrender.com/api/zapatillas`);
        const catalogoCompleto = await respuesta.json();
        
        const encontrada = catalogoCompleto.find(z => String(z.id) === String(id));
        setZapatilla(encontrada);
        
        if (encontrada) {
            setImagenActiva(encontrada.foto_principal);
            if(encontrada.tallas && encontrada.tallas.length > 0) {
                setTalla(typeof encontrada.tallas[0] === 'object' ? encontrada.tallas[0].talla : encontrada.tallas[0]);
            }

            // Extraer recomendaciones (excluyendo el producto actual)
            const otras = catalogoCompleto.filter(z => String(z.id) !== String(id));
            const randomRecomendadas = otras.sort(() => 0.5 - Math.random()).slice(0, 5);
            setRecomendaciones(randomRecomendadas);
        }
      } catch (err) { 
        console.error(err); 
      } finally { 
        setLoading(false); 
      }
    };
    
    fetchProductoYRecomendaciones();
  }, [id]);

  const agregarAlCarrito = () => {
    if (!zapatilla || !talla) return alert("Selecciona una talla primero.");
    
    let carrito = JSON.parse(localStorage.getItem('carritoSneakerShop')) || [];
    const tallaSeleccionadaStr = String(talla);
    const itemExistente = carrito.find(item => String(item.id) === String(zapatilla.id) && item.talla === tallaSeleccionadaStr);

    if (itemExistente) {
      itemExistente.cantidad += 1;
    } else {
      carrito.push({
        id: zapatilla.id,
        nombre: zapatilla.nombre,
        categoria: zapatilla.categoria,
        foto: zapatilla.foto_principal,
        codigo: zapatilla.codigo,
        talla: tallaSeleccionadaStr,
        cantidad: 1
      });
    }

    localStorage.setItem('carritoSneakerShop', JSON.stringify(carrito));
    window.dispatchEvent(new Event('cartUpdated')); 
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
        <div className="bg-white min-h-screen text-black font-sans">
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-10 h-10 border-4 border-gray-100 border-t-black rounded-full animate-spin" />
                <p className="mt-5 text-gray-500 text-sm uppercase tracking-widest font-bold">Cargando producto...</p>
            </div>
            <Footer />
        </div>
    );
  }

  if (!zapatilla) return <div className="text-center py-40">Producto no encontrado</div>;

  const todasLasFotos = [zapatilla.foto_principal, ...(zapatilla.galeria || [])].filter(Boolean);

  return (
    <div className="bg-white min-h-screen text-black font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-28 sm:pt-36 pb-16">
        
        {/* Producto Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl bg-gray-50 border border-gray-200 p-8 sm:p-14 flex items-center justify-center shadow-sm">
              <img src={imagenActiva} alt={zapatilla.nombre} className="max-h-[500px] w-full object-contain drop-shadow-xl img-zoom transition-all duration-300" />
            </div>
            
            {todasLasFotos.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {todasLasFotos.map((foto, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setImagenActiva(foto)}
                    className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-50 border p-3 flex items-center justify-center transition-all duration-300 ${imagenActiva === foto ? 'border-black shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
                  >
                    <img src={foto} alt={`Vista ${idx}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mb-2">{zapatilla.categoria}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none mb-4 text-black">{zapatilla.nombre}</h1>
            <p className="text-xl font-black text-[#25D366] mb-8 uppercase tracking-widest">Consultar Precio</p>

            {zapatilla.colores && zapatilla.colores.length > 0 && (
                <p className="text-sm font-semibold text-gray-500 mb-6 uppercase tracking-widest">
                    Colores disponibles: <span className="text-black font-bold">{zapatilla.colores.join(', ')}</span>
                </p>
            )}

            <div className="mb-8 border-t border-gray-100 pt-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 block mb-4">Selecciona tu Talla</span>
              <div className="flex flex-wrap gap-3">
                {zapatilla.tallas && zapatilla.tallas.map((t, idx) => {
                  const tallaStr = typeof t === 'object' ? String(t.talla) : String(t);
                  return (
                      <button key={idx} onClick={() => setTalla(tallaStr)} className={`w-14 h-14 flex items-center justify-center text-sm font-semibold rounded-2xl transition-all duration-300 ${ talla === tallaStr ? 'bg-black text-white shadow-lg scale-105' : 'bg-white text-black border border-gray-200 hover:border-black'}`}>
                      {tallaStr}
                      </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={agregarAlCarrito} className={`flex-1 py-5 font-bold uppercase tracking-widest text-sm rounded-full transition-all duration-300 ${addedToCart ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-gray-800'}`}>
                {addedToCart ? '✓ Añadido' : 'Añadir al carrito'}
              </button>
              <Link to="/checkout" className="w-full sm:w-auto border-2 border-gray-200 text-black py-5 px-8 font-bold uppercase tracking-widest text-sm rounded-full hover:border-black text-center">
                Ir al Carrito
              </Link>
            </div>
            
            <p className="mt-8 text-xs text-gray-400 uppercase tracking-widest font-bold">Código SKU: {zapatilla.codigo}</p>
          </div>
        </div>

        {/* Sección de Recomendaciones con Carrusel Móvil */}
        {recomendaciones.length > 0 && (
            <div className="mt-28 border-t border-gray-200 pt-16">
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black mb-8 text-left">
                    También te podría <span className="text-gray-400">gustar</span>
                </h3>
                
                {/* Contenedor Flex con Scroll Horizontal en móviles y Grid en Desktop */}
                <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-5 pb-8 snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {recomendaciones.map((item) => (
                    <Link 
                        to={`/producto/${item.id}`} 
                        key={item.id} 
                        className="group flex-none w-[75%] sm:w-[45%] lg:w-auto snap-start rounded-3xl overflow-hidden bg-white border border-gray-200 hover:border-black transition-all duration-500 shadow-sm hover:shadow-lg"
                    >
                        <div className="relative p-6 flex justify-center items-center overflow-hidden bg-gray-50 h-56">
                            <img src={item.foto_principal} alt={item.nombre} className="w-full h-full object-contain img-zoom drop-shadow-md" />
                        </div>
                        <div className="p-5 pt-4 text-left">
                            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1 font-bold">{item.categoria}</p>
                            <h4 className="text-sm font-bold text-black leading-snug line-clamp-1 mb-4">{item.nombre}</h4>
                            <span className="text-xs font-black text-white bg-[#25D366] px-3 py-1.5 rounded-full uppercase tracking-widest">Consultar</span>
                        </div>
                    </Link>
                    ))}
                </div>
            </div>
        )}

      </div>
      <Footer />
    </div>
  );
};
export default Producto;