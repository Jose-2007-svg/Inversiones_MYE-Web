import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Decorative gradient line at top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 py-16 sm:py-20">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 group mb-5">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-black font-black text-sm transition-transform duration-300 group-hover:scale-110">
                S
              </div>
              <span className="text-lg font-black uppercase tracking-tight text-white">
                SNEAKER<span className="text-gray-400">SHOP</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Zapatillas de la mejor calidad. Diseño, autenticidad y estilo urbano en cada paso.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[
                { name: 'IG', label: 'Instagram' },
                { name: 'TK', label: 'TikTok' },
                { name: 'X', label: 'Twitter' }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-xs font-bold"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white mb-6">
              Tienda
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/catalogo" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Cuenta (Desactivada para esta versión pública) */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white mb-6">
              Contacto
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="text-gray-400 text-sm flex items-center gap-2">
                  Atención vía WhatsApp
                </span>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white mb-6">
              Info
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-white text-sm">🚚</div>
                <span className="text-gray-400 text-sm">Envíos a todo el Perú</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-white text-sm">🔒</div>
                <span className="text-gray-400 text-sm">Cotización segura</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-white text-sm">📍</div>
                <span className="text-gray-400 text-sm">Lima Metropolitana y Provincias</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            © 2026 SneakerShop — Todos los derechos reservados
          </p>
          <div className="flex gap-6">
            <span className="text-gray-500 text-xs tracking-widest uppercase hover:text-white cursor-pointer transition-colors">Privacidad</span>
            <span className="text-gray-500 text-xs tracking-widest uppercase hover:text-white cursor-pointer transition-colors">Términos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;