import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Actualizar contador del carrito en tiempo real
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('carritoSneakerShop')) || [];
      const count = cart.reduce((acc, item) => acc + item.cantidad, 0);
      setCartItems(count);
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    // Interceptar eventos personalizados para cuando agregamos sin recargar
    window.addEventListener('cartUpdated', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-200' : 'bg-transparent'}`}>
      <div className={`overflow-hidden transition-all duration-500 ${scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'}`}>
        <div className="bg-black text-white text-center py-2">
          <p className="text-[11px] uppercase tracking-[0.25em] font-semibold">Envíos a todo el Perú — Cotiza por WhatsApp</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center h-16 sm:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-white font-black text-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">S</div>
          <span className="text-lg sm:text-xl font-black uppercase tracking-tight text-black transition-opacity group-hover:opacity-80">SNEAKER<span className="text-gray-500">SHOP</span></span>
        </Link>

        <div className="hidden md:flex gap-1 items-center">
          <Link to="/" className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 ${isActive('/') ? 'bg-black text-white' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}>Inicio</Link>
          <Link to="/catalogo" className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 ${isActive('/catalogo') ? 'bg-black text-white' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}>Catálogo</Link>
          <div className="w-px h-6 bg-gray-300 mx-2" />
          <Link to="/checkout" className="relative flex items-center gap-2 px-4 py-2 rounded-full text-black hover:bg-gray-100 transition-all duration-300 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {cartItems > 0 && <span className="absolute -top-1 -right-1 bg-black text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-[10px] font-bold shadow-lg">{cartItems}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;