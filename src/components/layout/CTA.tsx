const CTA = () => {
  return (
    <section>
      {/* Sección azul superior (CTA) */}
      <div className="bg-gradient-to-r from-[#3498db] to-[#2980b9] py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Necesitas asesoría personalizada?
          </h2>
          <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para ayudarte a encontrar la
            solución perfecta para tu negocio
          </p>
          <button className="px-8 py-3 bg-white text-[#3498db] rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            Contactar a un experto
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
