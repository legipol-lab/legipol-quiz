// ✅ src/pages/test/[id].tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link"; // ✅ Importamos Link aquí

export default function TestPage() {
  const router = useRouter();
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState<number | null>(null);
  const [respuestasUsuario, setRespuestasUsuario] = useState<number[]>([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  // Datos simulados del test
  const preguntas = [
    {
      tema: "Tema 01",
      pregunta: "¿Cuál es la característica principal del Derecho objetivo?",
      opciones: ["Generalidad", "Personalidad", "Variabilidad"],
      correcta: 0,
    },
    {
      tema: "Tema 02",
      pregunta: "La Constitución Española es:",
      opciones: ["La norma suprema del ordenamiento jurídico.", "Una ley ordinaria", "Un reglamento administrativo"],
      correcta: 0,
    },
    {
      tema: "Tema 03",
      pregunta: "¿Quién garantiza la unidad de España según la Constitución?",
      opciones: ["El Presidente", "El Ejército", "El Rey"],
      correcta: 2,
    },
    {
      tema: "Tema 04",
      pregunta: "¿En qué año se aprobó la Constitución Española?",
      opciones: ["1978", "1982", "1975"],
      correcta: 0,
    },
    {
      tema: "Tema 05",
      pregunta: "¿Qué artículo establece la separación de poderes en la Constitución?",
      opciones: ["Artículo 117", "Artículo 114", "Artículo 116"],
      correcta: 0,
    }
  ];

  const totalPreguntas = preguntas.length;
  const preguntaActual = preguntas[indice];

  // Calcular resultados
  const aciertos = respuestasUsuario.filter(
    (r, i) => r === preguntas[i].correcta
  ).length;

  const notaObtenida = (aciertos - (totalPreguntas - aciertos) / 2) * (10 / totalPreguntas);

  // Navegación entre preguntas
  const siguiente = () => {
    if (indice < preguntas.length - 1) {
      setIndice(indice + 1);
      setRespuesta(null);
    } else {
      setMostrarResultado(true);
    }
  };

  const anterior = () => {
    if (indice > 0) {
      setIndice(indice - 1);
      setRespuesta(respuestasUsuario[indice - 1] || null);
    }
  };

  const seleccionarOpcion = (index: number) => {
    const nuevasRespuestas = [...respuestasUsuario];
    nuevasRespuestas[indice] = index;
    setRespuestasUsuario(nuevasRespuestas);
    setRespuesta(index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-black py-4 shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide text-yellow-400">LEGIPOL · Examen</h1>
          <Link href="/dashboard" className="text-yellow-400 hover:text-yellow-300">
            Volver al Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* Barra de progreso */}
        {!mostrarResultado && (
          <>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-6">
              <div
                className="bg-yellow-400 h-2"
                style={{ width: `${((indice + 1) / preguntas.length) * 100}%` }}
              ></div>
            </div>

            {/* Información de la pregunta */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-2">{preguntaActual.tema} – Pregunta {indice + 1}</h2>
              <p className="mb-6 text-gray-700">{preguntaActual.pregunta}</p>

              {/* Opciones */}
              <div className="space-y-3 mb-6">
                {preguntaActual.opciones.map((opcion, index) => (
                  <button
                    key={index}
                    onClick={() => seleccionarOpcion(index)}
                    className={`block w-full text-left p-4 border rounded-lg transition ${
                      respuesta === index
                        ? "bg-yellow-100 border-yellow-400"
                        : "bg-white border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className="inline-block w-6 h-6 mr-3 text-center font-semibold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {opcion}
                  </button>
                ))}
              </div>

              {/* Controles de navegación */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={anterior}
                  disabled={indice === 0}
                  className={`px-4 py-2 rounded-md ${
                    indice === 0
                      ? "bg-gray-200 text-gray-500"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  ← Anterior
                </button>
                <button
                  onClick={siguiente}
                  className="ml-auto px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md transition"
                >
                  Siguiente →
                </button>
              </div>
            </section>
          </>
        )}

        {/* Pantalla de resultado final */}
        {mostrarResultado && (
          <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Test Finalizado</h2>
            <p className="mb-6">
              Has acertado <span className="font-semibold">{aciertos}</span> de{" "}
              <span className="font-semibold">{totalPreguntas}</span> preguntas.
            </p>
            <p className="text-xl font-bold text-yellow-600 mb-8">
              Nota obtenida: {notaObtenida.toFixed(2)} / 10
            </p>
            <Link
              href="/progreso"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg transition"
            >
              Ver mi Progreso
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}