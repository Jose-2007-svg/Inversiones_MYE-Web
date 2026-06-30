import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Importamos los componentes
import Navbar from '../components/Navbar';
import StoreSection from '../components/StoreSection';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

const Home = () => {
  const [sneakers, setSneakers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(true);

  // Consultar al backend en Render
  useEffect(() => {
    const fetchZapatillas = async () => {
      try {
        const res = await fetch('https://inversiones-mye.onrender.com/api/zapatillas');
        const data = await res.json();
        // Mostrar los últimos modelos agregados
        setSneakers(data.slice(0, 5)); 
      } catch (error) {
        console.error("Error cargando inicio:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchZapatillas();
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === sneakers.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? sneakers.length - 1 : prev - 1));
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0, scale: 0.95 })
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
         <p className="font-bold uppercase tracking-widest text-gray-500">Cargando la tienda...</p>
      </div>
    );
  }

  if (sneakers.length === 0) {
    return (
      <div className="bg-white min-h-screen text-black font-sans">
        <Navbar />
        <div className="flex items-center justify-center min-h-[70vh]">
          <p className="text-gray-500 font-bold">No hay zapatillas en el inventario aún.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const currentSneaker = sneakers[currentIndex];

  return (
    <div className="bg-white min-h-screen text-black font-sans">
      <Navbar />

      {/* ═══ 1. HERO CARRUSEL ═══ */}
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-white to-gray-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[100px] pointer-events-none opacity-50" />

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute flex flex-col items-center justify-center w-full h-full px-4"
          >
            <h1 className="absolute text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[20rem] font-black uppercase tracking-tighter text-black/[0.03] select-none z-0 text-center leading-none whitespace-nowrap pointer-events-none">
              {currentSneaker.categoria || 'URBAN'}
            </h1>

            <div className="relative z-10 animate-float mt-10 sm:mt-0">
              <img
                src={currentSneaker.foto_principal}
                alt={currentSneaker.nombre}
                className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>

            <div className="relative z-20 -mt-8 sm:-mt-16 text-center">
              <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold mb-3">
                {currentSneaker.categoria}
              </p>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-4 text-black">
                {currentSneaker.nombre}
              </h2>
              <p className="text-[#25D366] text-xl sm:text-2xl font-black mb-8 sm:mb-10">CONSULTAR PRECIO</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to={`/producto/${currentSneaker.id}`} className="btn-accent text-xs sm:text-sm py-4 px-12">
                  Ver Detalles
                </Link>
                <Link to="/catalogo" className="btn-outline text-xs sm:text-sm py-4 px-12">
                  Ver catálogo
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button onClick={prevSlide} className="absolute left-3 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black/5 backdrop-blur-sm border border-black/10 text-black/60 hover:bg-black/10 hover:text-black hover:scale-110 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
        </button>
        <button onClick={nextSlide} className="absolute right-3 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black/5 backdrop-blur-sm border border-black/10 text-black/60 hover:bg-black/10 hover:text-black hover:scale-110 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
        </button>

        <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-2">
          {sneakers.map((_, i) => (
            <button key={i} onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-black w-10 shadow-lg' : 'bg-black/20 w-4 hover:bg-black/40'}`} />
          ))}
        </div>
      </div>

      <StoreSection />
      <ProductGrid />
      <Footer />
    </div>
  );
};

export default Home;