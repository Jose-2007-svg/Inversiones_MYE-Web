import { Link } from 'react-router-dom';

const StoreSection = () => {
  const features = [
    {
      icon: '🚚',
      title: 'Envío',
      description: 'En compras mayores a S/ 250 dentro de Lima Metropolitana.',
      color: 'from-gray-100 to-white',
      iconBg: 'bg-black text-white',
    },
    {
      icon: '✅',
      title: '100% Auténtico',
      description: 'Cada par es verificado por nuestro equipo. Garantizamos originalidad.',
      color: 'from-gray-100 to-white',
      iconBg: 'bg-black text-white',
    },
    {
      icon: '🔒',
      title: 'Pago Seguro',
      description: 'Integración directa con pasarelas. Tu información está protegida.',
      color: 'from-gray-100 to-white',
      iconBg: 'bg-black text-white',
    }
  ];

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-8 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-20">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mb-3">
            ¿Por qué elegirnos?
          </p>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-black">
            Compra con <span className="text-gray-500">confianza</span>
          </h3>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-3xl bg-gray-50 border border-gray-200 hover:border-black p-8 sm:p-10 flex flex-col items-center text-center transition-all duration-500 card-hover overflow-hidden shadow-sm hover:shadow-lg"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-b ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

              <div className={`relative z-10 w-16 h-16 rounded-2xl ${feature.iconBg} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-500`}>
                {feature.icon}
              </div>
              <h4 className="relative z-10 text-black font-bold text-base uppercase tracking-widest mb-3">
                {feature.title}
              </h4>
              <p className="relative z-10 text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 sm:mt-20">
          <Link
            to="/catalogo"
            className="btn-accent py-4 px-10"
          >
            Ver Catálogo Completo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StoreSection;