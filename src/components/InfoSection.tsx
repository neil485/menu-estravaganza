export default function InfoSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-heading text-brand-brown dark:text-brand-cream mb-4">
        {'\uD83D\uDCCD'} Informaci&oacute;n
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Ubicacion */}
        <div className="bg-white dark:bg-[#2a1f0e] rounded-xl border border-brand-cream-dark dark:border-brand-brown/50 p-6">
          <h3 className="font-heading text-brand-brown dark:text-brand-cream text-lg mb-3 flex items-center gap-2">
            {'\uD83D\uDCCD'} Ubicaci&oacute;n
          </h3>
          <p className="text-sm text-brand-brown-light dark:text-brand-cream-dark leading-relaxed">
            Corinto, Departamento de Moraz&aacute;n, El Salvador
          </p>
          <div className="mt-4 pt-3 border-t border-brand-cream-dark dark:border-brand-brown/30">
            <h4 className="font-medium text-brand-brown dark:text-brand-cream text-sm mb-2">
              {'\uD83D\uDCDE'} Contacto
            </h4>
            <p className="text-sm text-brand-brown-light dark:text-brand-cream-dark">
              WhatsApp: 7631-3574
            </p>
          </div>
        </div>

        {/* Nota especial */}
        <div className="bg-white dark:bg-[#2a1f0e] rounded-xl border border-brand-cream-dark dark:border-brand-brown/50 p-6">
          <h3 className="font-heading text-brand-brown dark:text-brand-cream text-lg mb-3 flex items-center gap-2">
            {'\u2615'} Nota Especial
          </h3>
          <p className="text-sm text-brand-primary dark:text-brand-primary-light font-medium">
            {'\u2615'} Todos los desayunos incluyen caf&eacute;
          </p>
          <div className="mt-4 pt-3 border-t border-brand-cream-dark dark:border-brand-brown/30">
            <h4 className="font-medium text-brand-brown dark:text-brand-cream text-sm mb-2">
              {'\uD83C\uDF7D\uFE0F'} Horarios
            </h4>
            <p className="text-sm text-brand-brown-light dark:text-brand-cream-dark">
              Abierto todos los d&iacute;as
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
