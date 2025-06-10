// src/pages/ranking.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";

export default function RankingPage() {
  const [temas, setTemas] = useState<string[]>([]);
  const [seleccionado, setSeleccionado] = useState<string>("");
  const [ranking, setRanking] = useState<
    Array<{ alias: string; score: number; fecha: string }>
  >([]);

  // Cargar todos los 45 temas oficiales al inicio
  useEffect(() => {
    const listaTemas = [
      // Ciencias Jurídicas (26 temas)
      "Tema 01. El Derecho: Concepto y acepciones.",
      "Tema 02. La Constitución Española (I): Estructura y caracteres de la Constitución Española de 1978.",
      "Tema 03. La Constitución Española (II): De la Corona.",
      "Tema 04. La Unión Europea.",
      "Tema 05. La organización y funcionamiento de la AGE.",
      "Tema 06. Los funcionarios públicos.",
      "Tema 07. El Ministerio del Interior.",
      "Tema 08. La Dirección General de la Policía.",
      "Tema 09. Ley Orgánica 2/1986, de 13 de marzo, de Fuerzas y Cuerpos de Seguridad.",
      "Tema 10. Entrada, libre circulación y residencia en España de ciudadanos de los Estados miembros de la UE.",
      "Tema 11. Disposiciones generales en materia de seguridad privada en España.",
      "Tema 12. Ley Orgánica 4/2015, de 30 de marzo, de protección de la seguridad ciudadana.",
      "Tema 13. Medidas para la Protección de Infraestructuras Críticas.",
      "Tema 14. Derecho Penal Parte General.",
      "Tema 15. Delitos contra el patrimonio y contra el orden socioeconómico.",
      "Tema 16. Delitos contra el orden público.",
      "Tema 17. Delitos informáticos.",
      "Tema 18. Noción de Derecho Procesal Penal.",
      "Tema 19. Ley 4/2015, de 27 de abril, del Estatuto de la víctima del delito.",
      "Tema 20. Políticas de igualdad, protección y no discriminación en la AGE.",
      "Tema 21. Introducción a la Prevención de Riesgos Laborales.",
      "Tema 22. Marco normativo básico en prevención de riesgos laborales.",
      "Tema 23. La protección de datos de carácter personal.",
      "Tema 24. La protección internacional.",
      "Tema 25. Infracciones en materia de extranjería y su régimen sancionador.",
      "Tema 26. Derechos Humanos. Declaración Universal de Derechos Humanos.",

      // Ciencias Sociales (11 temas)
      "Tema 27. Globalización y antiglobalización.",
      "Tema 28. Actitudes y valores sociales.",
      "Tema 29. Principios éticos de la sociedad actual.",
      "Tema 30. Inmigración.",
      "Tema 31. Concepto de geografía humana.",
      "Tema 32. La seguridad.",
      "Tema 33. Drogodependencias.",
      "Tema 34. El desarrollo sostenible.",
      "Tema 35. Gramática de la lengua española.",
      "Tema 36. Ortografía de la lengua española.",
      "Tema 37. Derechos Humanos. Declaración Universal de Derechos Humanos.",

      // Materias Técnico-Científicas (8 temas)
      "Tema 38. Fundamentos de sistemas operativos.",
      "Tema 39. Redes informáticas.",
      "Tema 40. Inteligencia: Dato, información e inteligencia.",
      "Tema 41. Ciberdelincuencia y agentes de la Amenaza.",
      "Tema 42. Origen de las armas de fuego.",
      "Tema 43. El vehículo prioritario.",
      "Tema 44. La Seguridad en la Conducción de Vehículos Prioritarios.",
      "Tema 45. Prevención de Riesgos Laborales en Seguridad Vial."
    ];

    setTemas(listaTemas);
    setSeleccionado(listaTemas[0]);
  }, []);

  // Simular carga de datos cuando se selecciona un tema
  useEffect(() => {
    if (!seleccionado) return;

    // Aquí iría la llamada a Firebase
    // Ejemplo simulado:
    const datosSimulados = [
      { alias: "USR001", score: 9.8, fecha: "2025-01-01" },
      { alias: "USR005", score: 9.5, fecha: "2025-01-03" },
      { alias: "USR012", score: 9.2, fecha: "2025-01-05" },
      { alias: "USR023", score: 8.9, fecha: "2025-01-02" },
      { alias: "USR034", score: 8.7, fecha: "2025-01-04" }
    ];

    setRanking(datosSimulados);
  }, [seleccionado]);

  // Calcular estadísticas
  const maxScore = ranking.length ? Math.max(...ranking.map(p => p.score)) : 0;
  const minScore = ranking.length ? Math.min(...ranking.map(p => p.score)) : 0;
  const avgScore = ranking.length
    ? (ranking.reduce((acc, curr) => acc + curr.score, 0) / ranking.length).toFixed(2)
    : "0.00";

  // Colores por posición
  const coloresPorPosicion = ["#F5D020", "#F97316", "#2563EB", "#10B981", "#6366F1"];

  // Añadir color a cada registro
  const rankingConColor = ranking.slice(0, 5).map((item, index) => ({
    ...item,
    fill: coloresPorPosicion[index % coloresPorPosicion.length]
  }));

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white py-4 shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide text-yellow-500">LEGIPOL · Ranking</h1>
          <Link href="/dashboard" className="text-yellow-500 hover:underline">
            Volver al Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <h2 className="text-2xl font-bold">Ranking por Tema</h2>

        {/* Selector de tema */}
        <div>
          <label htmlFor="tema" className="block mb-2 text-sm font-medium">
            Selecciona un tema:
          </label>
          <select
            id="tema"
            value={seleccionado}
            onChange={(e) => setSeleccionado(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            {temas.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Tabla de ranking */}
        {ranking.length > 0 && (
          <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-semibold">Top 5 – {seleccionado}</h3>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alias</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Puntuación</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ranking.map((item, index) => (
                  <tr key={index} className={`${index === 0 ? 'bg-yellow-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index + 1}º</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.alias}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.score.toFixed(1)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* Gráfico de barras horizontales */}
        {ranking.length > 0 && (
          <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mt-8">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-semibold">Gráfico de Puntuaciones</h3>
            </div>
            <div className="p-6">
              <div style={{ width: "100%", height: 250 }}>
                <ResponsiveContainer>
                  <BarChart data={rankingConColor} layout="vertical" margin={{ left: 120 }}>
                    <YAxis
                      type="category"
                      dataKey="alias"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <XAxis type="number" hide domain={[0, 10]} />
                    <Bar
                      label={{
                        position: "right",
                        fill: "#666",
                        formatter: (props) => props.value?.toFixed(1),
                      }}
                      dataKey="score"
                      shape={({ x, y, width, height, fill }) => (
                        <g>
                          {/* Sombra base */}
                          <rect
                            x={x}
                            y={y}
                            width={width}
                            height={height}
                            fill="#E0E0E0"
                            rx={4}
                            ry={4}
                          />
                          {/* Barra superior con color principal */}
                          <rect
                            x={x + 2}
                            y={y + 2}
                            width={width - 4}
                            height={height - 4}
                            fill={fill as string}
                            rx={4}
                            ry={4}
                          />
                        </g>
                      )}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Estadísticas adicionales */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                <div className="bg-yellow-50 text-yellow-800 p-3 rounded-md">
                  <span className="block font-semibold">Máxima</span>
                  <span className="text-lg font-bold">{maxScore.toFixed(1)}</span>
                </div>
                <div className="bg-blue-50 text-blue-800 p-3 rounded-md">
                  <span className="block font-semibold">Media</span>
                  <span className="text-lg font-bold">{avgScore}</span>
                </div>
                <div className="bg-green-50 text-green-800 p-3 rounded-md">
                  <span className="block font-semibold">Mínima</span>
                  <span className="text-lg font-bold">{minScore.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Mensaje si no hay datos */}
        {ranking.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-500">No hay datos para mostrar aún.</p>
          </div>
        )}
      </main>
    </div>
  );
}