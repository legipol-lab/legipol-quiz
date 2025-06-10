// src/pages/progreso.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProgresoPage() {
  const [user] = useState<{ email?: string } | null>(null);
  const [testsRealizados] = useState([
    {
      id: 1,
      tema: "Tema 01. El Derecho...",
      fecha: "2025-04-01",
      nota: 9.8,
      tiempo: 28,
      aprobado: true
    },
    {
      id: 2,
      tema: "Tema 03. De la Corona",
      fecha: "2025-04-05",
      nota: 7.2,
      tiempo: 33,
      aprobado: true
    },
    {
      id: 3,
      tema: "Tema 41. Ciberdelincuencia",
      fecha: "2025-04-07",
      nota: 5.1,
      tiempo: 42,
      aprobado: false
    }
  ]);

  // Datos generales del usuario
  const [progresoGeneral] = useState({
    promedio: 7.8,
    mejorTema: "Derecho Penal",
    peorTema: "Ciberdelincuencia",
    testsRealizados: 23,
    horasEstudio: 16.5
  });

  // Balance por áreas
  const areas = [
    { nombre: "Ciencias Jurídicas", acierto: 85 },
    { nombre: "Ciencias Sociales", acierto: 62 },
    { nombre: "Materias Técnicas", acierto: 48 }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white py-4 shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide text-yellow-500">LEGIPOL · Progreso</h1>
          <Link href="/dashboard" className="text-yellow-500 hover:underline">
            Volver al Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <h2 className="text-2xl font-bold">Tu Progreso General</h2>

        <p className="text-gray-600 mb-6">
          Aquí tienes tus datos consolidados: desde tu progreso general hasta tu historial de tests.
        </p>

        {/* Estadísticas Generales */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-sm uppercase text-gray-500">Promedio General</h3>
            <p className="mt-2 text-3xl font-bold">{progresoGeneral.promedio.toFixed(1)}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-sm uppercase text-gray-500">Mejor Tema</h3>
            <p className="mt-2 text-xl font-bold">{progresoGeneral.mejorTema}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-sm uppercase text-gray-500">Peor Tema</h3>
            <p className="mt-2 text-xl font-bold">{progresoGeneral.peorTema}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-sm uppercase text-gray-500">Tests Realizados</h3>
            <p className="mt-2 text-3xl font-bold">{progresoGeneral.testsRealizados}</p>
          </div>
        </section>

        {/* Balance por Área Temática */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="font-semibold mb-4">Balance por Área Temática</h3>
          <div className="space-y-4">
            {areas.map((area) => {
              let color =
                area.acierto > 75 ? "bg-green-500" :
                area.acierto > 50 ? "bg-yellow-500" : "bg-red-500";

              return (
                <div key={area.nombre} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{area.nombre}</span>
                    <span>{area.acierto}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className={`h-2 ${color}`} style={{ width: `${area.acierto}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Historial Reciente */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="font-semibold mb-4">Mis Test Recientes</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tema</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nota</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiempo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resultado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {testsRealizados.map((test, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{test.fecha}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{test.tema}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-block w-12 text-center font-medium ${
                      test.nota >= 5 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {test.nota.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{test.tiempo} min</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      test.aprobado ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {test.aprobado ? "Aprobado" : "No aprobado"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Gráfico de evolución */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="font-semibold mb-4">Evolución de Notas</h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {[7.2, 7.5, 7.4, 7.9, 8.1, 8.0, 8.3].map((nota, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-yellow-400 rounded-t-md"
                  style={{
                    height: `${nota * 10}px`,
                    minHeight: "10px"
                  }}
                ></div>
                <span className="mt-2 text-xs text-gray-500">Semana {i + 1}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Botón para mejorar tema débil */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="font-semibold mb-4">Mejora tu Puntaje</h3>
          <p className="mb-4 text-gray-600">
            El tema donde más necesitas mejorar es{" "}
            <strong>{progresoGeneral.peorTema}</strong>. ¿Quieres practicarlo ahora?
          </p>
          <Link
            href="/test/seleccion"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition"
          >
            Repasar Tema Débil →
          </Link>
        </section>
      </main>
    </div>
  );
}