import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout = () => {
  const [carrito, setCarrito] = useState([]);
  const [nombreCliente, setNombreCliente] = useState('');
  const [destino, setDestino] = useState('Lima Metropolitana');
  const [direccion, setDireccion] = useState('');

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carritoSneakerShop')) || [];
    setCarrito(carritoGuardado);
  }, []);

  const modificarCantidad = (index, cambio) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad += cambio;
    if (nuevoCarrito[index].cantidad <= 0) nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carritoSneakerShop', JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const eliminarItem = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carritoSneakerShop', JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const procesarPedidoWhatsApp = () => {
    if (carrito.length === 0) return alert('Tu carrito está vacío.');
    if (!nombreCliente.trim()) return alert('Por favor, ingresa tu nombre para atenderte mejor.');

    let mensaje = `Hola equipo de Sneaker Zone, soy *${nombreCliente.trim()}*. 👋\n\n`;
    mensaje += `Me gustaría consultar la disponibilidad y precios de los siguientes modelos:\n\n`;

    carrito.forEach((item, index) => {
      mensaje += `*${index + 1}. ${item.nombre}*\n`;
      mensaje += `▸ Código: ${item.codigo}\n`;
      mensaje += `▸ Talla: ${item.talla}\n`;
      mensaje += `▸ Cantidad: ${item.cantidad} par(es)\n\n`;
    });

    mensaje += `📍 *Destino:* ${destino}\n`;
    if (direccion.trim()) mensaje += `🏠 *Referencia:* ${direccion.trim()}\n\n`;
    mensaje += `Quedo atento/a. ¡Gracias!`;

    // REEMPLAZA EL 51999999999 POR TU NÚMERO DE WHATSAPP (código país + número)
    const numeroVendedor = "51928358327"; 
    const urlWhatsApp = `https://wa.me/${numeroVendedor}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen text-black font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-black uppercase tracking-tight text-black mb-8">Carrito de Compras</h2>
            {carrito.length === 0 ? (
              <div className="rounded-3xl bg-white border border-gray-200 text-center py-20 shadow-sm">
                <p className="text-gray-500 font-bold mb-6">No hay artículos en tu carrito.</p>
                <Link to="/catalogo" className="btn-accent py-4 px-8 text-sm">Explorar catálogo →</Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {carrito.map((item, index) => (
                  <div key={index} className="rounded-3xl bg-white border border-gray-200 p-5 flex gap-5 items-center">
                    <img src={item.foto} alt={item.nombre} className="w-24 h-24 object-contain bg-gray-50 rounded-2xl p-2" />
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg text-black">{item.nombre}</h3>
                      <p className="text-gray-500 text-xs font-semibold mt-1">Talla: {item.talla} · {item.codigo}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <button onClick={() => modificarCantidad(index, -1)} className="w-8 h-8 border rounded-xl font-bold">−</button>
                        <span className="font-bold">{item.cantidad}</span>
                        <button onClick={() => modificarCantidad(index, 1)} className="w-8 h-8 border rounded-xl font-bold">+</button>
                      </div>
                    </div>
                    <button onClick={() => eliminarItem(index)} className="text-red-500 text-xl font-bold p-2">✕</button>
                  </div>
                ))}
                
                <div className="rounded-3xl bg-white border border-gray-200 p-6 mt-6">
                  <h3 className="font-bold text-sm uppercase mb-4 text-black">Datos de Contacto</h3>
                  <input type="text" placeholder="Tu nombre y apellido" value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} className="input-premium mb-4" />
                  <select value={destino} onChange={(e) => setDestino(e.target.value)} className="input-premium mb-4">
                    <option value="Lima Metropolitana">Lima Metropolitana (Envío a domicilio)</option>
                    <option value="Provincia">Provincia (Pago en agencia)</option>
                  </select>
                  <input type="text" placeholder="Distrito o Ciudad" value={direccion} onChange={(e) => setDireccion(e.target.value)} className="input-premium" />
                </div>
              </div>
            )}
          </div>

          {/* Resumen lateral */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-white border border-gray-200 p-8 sticky top-28 shadow-xl">
              <h3 className="font-black text-xl uppercase mb-6 border-b pb-4">Resumen</h3>
              <p className="text-gray-500 text-sm font-semibold mb-6 leading-relaxed">
                Nuestros asesores de venta verificarán el stock físico exacto y te brindarán la cotización final junto con las opciones de envío seguro.
              </p>
              <button onClick={procesarPedidoWhatsApp} className="w-full bg-[#25D366] text-white font-bold uppercase tracking-widest py-5 rounded-full text-sm hover:bg-[#1DA851] transition shadow-lg flex items-center justify-center gap-2">
                💬 Consultar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Checkout;