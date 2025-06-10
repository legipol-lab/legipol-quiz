/// src/pages/settings.tsx

"use client";

import { useState } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [alias, setAlias] = useState("USR1234");
  const [modoOscuro, setModoOscuro] = useState(false);
  const [notificaciones, setNotificaciones] = useState(true);
  const [recordatorioCorreo, setRecordatorioCorreo] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white py-4 shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide text-yellow-500">LEGIPOL · Ajustes</h1>
          <Link href="/dashboard" className="text-yellow-500 hover:underline">
            Volver al Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <h2 className="text-2xl font-bold">Configuración de la Cuenta</h2>

        <p className="text-gray-600 mb-6">
          Aquí puedes gestionar tu perfil, preferencias y privacidad.
        </p>

        {/* Sección: Información Personal */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6">
          <h3 className="font-semibold text-lg">Información Personal</h3>

          <div className="space-y-4">
            <label className="block">
              <span className="block text-sm font-medium text-gray-700">Alias Anónimo</span>
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                disabled
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-gray-700">Correo Electrónico</span>
              <input
                type="email"
                value="usuario@example.com"
                disabled
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </label>

            <button className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition">
              Cambiar Contraseña
            </button>
          </div>
        </section>

        {/* Sección: Preferencias de Estudio */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6">
          <h3 className="font-semibold text-lg">Preferencias de Estudio</h3>

          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={modoOscuro}
                onChange={() => setModoOscuro(!modoOscuro)}
                className="mr-2 h-4 w-4 text-yellow-500 accent-yellow-500"
              />
              <span className="text-sm">Usar modo oscuro</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notificaciones}
                onChange={() => setNotificaciones(!notificaciones)}
                className="mr-2 h-4 w-4 text-yellow-500 accent-yellow-500"
              />
              <span className="text-sm">Recibir recordatorios diarios</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={recordatorioCorreo}
                onChange={() => setRecordatorioCorreo(!recordatorioCorreo)}
                className="mr-2 h-4 w-4 text-yellow-500 accent-yellow-500"
              />
              <span className="text-sm">Enviar resumen semanal por correo</span>
            </label>
          </div>
        </section>

        {/* Sección: Acciones Adicionales */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6">
          <h3 className="font-semibold text-lg">Acciones Adicionales</h3>

          <div className="space-y-4">
            <button className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition">
              Cerrar Sesión
            </button>

            <button className="w-full py-2 px-4 bg-red-100 text-red-800 font-semibold rounded-lg transition">
              Eliminar Cuenta
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}