// pages/dashboard.tsx
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
    <aside className="w-64 bg-white shadow-lg p-6 border-r">
  <h1 className="text-xl font-bold mb-8 text-yellow-500">LEGIPOL Quiz</h1>
  <nav className="space-y-2">
    <Link href="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-yellow-100 text-gray-700">
      🏠 Dashboard
    </Link>
    <Link href="/test/seleccion" className="block px-4 py-2 rounded-lg hover:bg-yellow-100 text-gray-700">
      ✅ Test por Tema
    </Link>
    <Link href="/ranking" className="block px-4 py-2 rounded-lg hover:bg-yellow-100 text-gray-700">
      🧠 Ranking por Tema
    </Link>    
    <Link href="/progreso" className="block px-4 py-2 rounded-lg hover:bg-yellow-100 text-gray-700 font-medium">
      📈 Progreso Global
    </Link>
    <Link href="/settings" className="block px-4 py-2 rounded-lg hover:bg-yellow-100 text-gray-700">
      ⚙️ Ajustes
    </Link>
    <Link href="/auth/login" onClick={() => auth.signOut()} className="block px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg mt-auto">
      🔒 Cerrar Sesión
    </Link>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8 bg-gray-50">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Usuario_1234</span>
            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white text-xs font-bold">U</div>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card: Test por Tema */}
          <Link href="/test/seleccion" className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Test por Tema</h3>
            <p className="text-sm text-gray-600 mb-4">Selecciona temas y genera un nuevo test personalizado.</p>
            <span className="text-yellow-600 text-sm font-medium">Ir a Test →</span>
          </Link>

          {/* Card: Ranking por Tema */}
          <Link href="/ranking" className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Ranking por Tema</h3>
            <p className="text-sm text-gray-600 mb-4">Visualiza el ranking de puntuaciones por tema.</p>
            <span className="text-yellow-600 text-sm font-medium">Ver Ranking →</span>
          </Link>

          {/* Card: Mejores Puntuaciones */}
          <Link href="/historial" className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Mejores Puntuaciones</h3>
            <p className="text-sm text-gray-600 mb-4">Consulta tus mejores resultados históricos por tema.</p>
            <span className="text-yellow-600 text-sm font-medium">Ver Historial →</span>
          </Link>

          {/* Card: Configuración */}
          <Link href="/settings" className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Configuración</h3>
            <p className="text-sm text-gray-600 mb-4">Gestiona tus ajustes, suscripciones y perfil.</p>
            <span className="text-yellow-600 text-sm font-medium">Ir a Ajustes →</span>
          </Link>
        </section>
      </main>
    </div>
  );
}