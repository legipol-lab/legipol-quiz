// src/pages/test/seleccion.tsx

"use client";

import { useState } from "react";
import Link from "next/link";

export default function SeleccionTest() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [numPreguntas, setNumPreguntas] = useState(20);

  // Tus 45 temas reales, agrupados por áreas
  const temasPorArea = {
    "Ciencias Jurídicas": [
  "Tema 01. El Derecho: Concepto y acepciones.",
  "Tema 02. La Constitución Española (I).",
  "Tema 03. La Constitución Española (II).",
  "Tema 04. La Unión Europea.",
  "Tema 05. La AGE.",
  "Tema 06. Los funcionarios públicos.",
  "Tema 07. El Ministerio del Interior.",
  "Tema 08. La Dirección General de la Policía.",
  "Tema 09. Ley Orgánica 2/1986, de Fuerzas y Cuerpos de Seguridad.",
  "Tema 10. Entrada, libre circulación y residencia en España.",
  "Tema 11. Infracciones en materia de extranjería.",
  "Tema 12. La protección internacional.",
  "Tema 13. Disposiciones generales en materia de seguridad privada en España.",
  "Tema 14. Ley Orgánica 4/2015, de 30 de marzo.",
  "Tema 15. Medidas para la Protección de Infraestructuras Críticas.",
  "Tema 16. Derecho Penal Parte General.",
  "Tema 17. Derecho Penal Especial: Del homicidio y sus formas.",
  "Tema 18. Delitos contra el patrimonio y orden socioeconómico.",
  "Tema 19. Delitos contra el orden público.",
  "Tema 20. Delitos informáticos.",
  "Tema 21. Noción de Derecho Procesal Penal.",
  "Tema 22. Ley 4/2015, Estatuto de la víctima del delito.",
  "Tema 23. Políticas de igualdad, protección y no discriminación en la AGE.",
  "Tema 24. Introducción a la Prevención de Riesgos Laborales.",
  "Tema 25. Marco normativo básico en prevención de riesgos laborales.",
  "Tema 26. La protección de datos de carácter personal."
],
    "Ciencias Sociales": [
      "Tema 27. Derechos Humanos. Declaración Universal de Derechos Humanos.",
      "Tema 28. Globalización y antiglobalización.",
      "Tema 29. Actitudes y valores sociales.",
      "Tema 30. Principios éticos de la sociedad actual.",
      "Tema 31. Inmigración.",
      "Tema 32. Concepto de geografía humana.",
      "Tema 33. La seguridad.",
      "Tema 34. Drogodependencias.",
      "Tema 35. El desarrollo sostenible.",
      "Tema 36. Gramática de la lengua española.",
      "Tema 37. Ortografía de la lengua española."
    ],
    "Materias Técnico-Científicas": [
      "Tema 38. Fundamentos de sistemas operativos.",
      "Tema 39. Redes informáticas.",
      "Tema 40. Inteligencia: Dato, información e inteligencia.",
      "Tema 41. Ciberdelincuencia y agentes de la Amenaza.",
      "Tema 42. Origen de las armas de fuego.",
      "Tema 43. El vehículo prioritario.",
      "Tema 44. La Seguridad en la Conducción de Vehículos Prioritarios.",
      "Tema 45. Prevención de Riesgos Laborales en Seguridad Vial."
    ]
  };

  const toggleArea = (area: string) => {
    const temasArea = temasPorArea[area as keyof typeof temasPorArea];
    const seleccionadosFiltrados = seleccionados.filter(
      (t) => !temasArea.includes(t)
    );

    if (
      seleccionadosFiltrados.length === 0 ||
      seleccionadosFiltrados.length < temasArea.length
    ) {
      setSeleccionados([...new Set([...seleccionados, ...temasArea])]);
    } else {
      setSeleccionados(seleccionadosFiltrados);
    }
  };

  const toggleTema = (tema: string) => {
    setSeleccionados((prev) =>
      prev.includes(tema)
        ? prev.filter((t) => t !== tema)
        : [...prev, tema]
    );
  };

  const iniciarTest = () => {
    if (seleccionados.length === 0) {
      alert("Por favor, selecciona al menos un tema.");
      return;
    }
    if (numPreguntas < 1 || numPreguntas > 100) {
      alert("Elige entre 1 y 100 preguntas.");
      return;
    }

    localStorage.setItem(
      "configTest",
      JSON.stringify({
        temas: seleccionados,
        totalPreguntas: numPreguntas
      })
    );

    window.location.href = "/test/examen";
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white py-4 shadow">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold tracking-wide text-yellow-500">LEGIPOL Quiz</h1>
          <Link href="/dashboard" className="text-yellow-500 hover:underline">
            Volver al Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <h2 className="text-2xl font-bold">Selecciona los Temas para tu Simulacro</h2>

        {/* Tarjetas desplegables */}
        {Object.keys(temasPorArea).map((area) => {
          const temasArea = temasPorArea[area as keyof typeof temasPorArea];
          const allSelected = temasArea.every((t) =>
            seleccionados.includes(t)
          );

          return (
            <section key={area}>
              <div
                className="px-6 py-4 bg-gray-100 border border-gray-200 rounded-lg cursor-pointer flex justify-between items-center"
                onClick={() => setExpanded(expanded === area ? null : area)}
              >
                <h3 className="text-lg font-semibold">{area}</h3>
                <span className="text-xl">{expanded === area ? "−" : "+"}</span>
              </div>

              {expanded === area && (
                <div className="mt-2 p-6 bg-white border-t-0 border border-gray-200 rounded-b-lg space-y-2">
                  <label className="flex items-center gap-2 font-medium">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={() => toggleArea(area)}
                      className="form-checkbox h-5 w-5 text-yellow-500 accent-yellow-500"
                    />
                    <span>Seleccionar todos los temas de esta área</span>
                  </label>

                  <div className="ml-6 mt-2 space-y-2">
                    {temasArea.map((t) => (
                      <label key={t} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={seleccionados.includes(t)}
                          onChange={() => toggleTema(t)}
                          className="form-checkbox h-4 w-4 text-yellow-500 accent-yellow-500"
                        />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}

        {/* Configuración final */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm space-y-6">
          <h3 className="font-semibold text-lg">Configura tu Test</h3>

          <div>
            <label className="block mb-2 text-sm">Número de preguntas</label>
            <input
              type="number"
              min="1"
              max="100"
              value={numPreguntas}
              onChange={(e) => setNumPreguntas(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            onClick={iniciarTest}
            className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg transition"
          >
            🚔 Iniciar Test
          </button>
        </div>
      </main>
    </div>
  );
}