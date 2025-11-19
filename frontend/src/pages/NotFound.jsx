// src/pages/NotFound.jsx
export default function NotFound() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-24 font-inter">
      <h1 className="text-secondary text-[28px] font-extrabold mb-2">
        404
      </h1>

      <p className="text-text text-[18px] font-semibold mb-3 text-center px-6">
        Página no encontrada
      </p>

      <p className="text-subtext text-[14px] text-center px-8 leading-tight">
        La ruta que intentaste abrir no existe o fue movida.
      </p>

      <a
        href="/"
        className="
          mt-6 bg-primary text-white px-5 py-2 
          rounded-[14px] shadow font-semibold
          hover:opacity-90 transition
        "
      >
        Volver al inicio
      </a>
    </div>
  );
}
