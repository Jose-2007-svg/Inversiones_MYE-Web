import { Link } from 'react-router-dom';
import { IconBrandTiktok, IconBrandFacebook, IconCamper, IconLock, IconMapPin } from '@tabler/icons-react';

const Footer = () => {
  // REEMPLAZA ESTE NÚMERO POR EL TUYO
  const numeroWhatsApp = "51999999999"; 
  const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=Hola%20Inversiones%20MYE,%20necesito%20asesor%C3%ADa.`;

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 py-16 sm:py-20">
          
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 group mb-5">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-black font-black text-sm transition-transform duration-300 group-hover:scale-110">
                I
              </div>
              <span className="text-lg font-black uppercase tracking-tight text-white">
                INVERSIONES <span className="text-gray-400">MYE</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Zapatillas de la mejor calidad. Autenticidad, confianza y estilo en cada paso.
            </p>
            
            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <IconBrandTiktok stroke={1.5} size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <IconBrandFacebook stroke={1.5} size={20} />
              </a>
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white mb-6">Tienda</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/catalogo" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Catálogo</Link>
              </li>
              <li>
                <Link to="/checkout" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Carrito de Compras</Link>
              </li>
            </ul>
          </div>

          {/* Contacto (WhatsApp Funcional) */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white mb-6">Contacto</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={linkWhatsApp} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#25D366] transition-colors duration-300 text-sm flex items-center gap-2">
                  Atención vía WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Info con Iconos Tabler */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white mb-6">Info</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-white">
                  <IconCamper stroke={1.5} size={18} />
                </div>
                <span className="text-gray-400 text-sm">Envíos por Shalom a provincia</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-white">
                  <IconLock stroke={1.5} size={18} />
                </div>
                <span className="text-gray-400 text-sm">Cotización segura</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-white">
                  <IconMapPin stroke={1.5} size={18} />
                </div>
                <span className="text-gray-400 text-sm">Entregas en Lima Metropolitana</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            © 2026 INVERSIONES MYE — Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;