import { useState } from "react";
import { useRouter } from "next/router";

const tests = [
  { id: 1, tema: "Constitución Española", nivel: "Fácil", preguntas: 20 },
  { id: 2, tema: "Constitución Española", nivel: "Media", preguntas: 30 },
  { id: 3, tema: "Derechos Humanos", nivel: "Fácil", preguntas: 25 },
  { id: 4, tema: "Derechos Humanos", nivel: "Difícil", preguntas: 40 },
  { id: 5, tema: "Derecho Penal", nivel: "Media", preguntas: 35 },
  { id: 6, tema: "Derecho Penal", nivel: "Difícil", preguntas: 50 }
];

const temas = Array.from(new Set(tests.map(t => t.tema)));
const niveles = Array.from(new Set(tests.map(t => t.nivel)));
const preguntasUnicas = Array.from(new Set(tests.map(t => t.preguntas))).sort((a, b) => a - b);

export default function Home() {
  const [tema, setTema] = useState("");
  const [nivel, setNivel] = useState("");
  const [numPreguntas, setNumPreguntas] = useState("");
  const router = useRouter();

  const testsFiltrados = tests.filter(test => {
    const byTema = tema ? test.tema === tema : true;
    const byNivel = nivel ? test.nivel === nivel : true;
    const byPreguntas = numPreguntas ? test.preguntas === Number(numPreguntas) : true;
    return byTema && byNivel && byPreguntas;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR negro */}
      <nav className="w-full bg-black py-4 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center px-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-yellow-400 tracking-wide">LEGIPOL Quiz</h1>
        </div>
      </nav>

      {/* FILTROS */}
      <div className="max-w-3xl mx-auto text-center mb-10 mt-10">
        <p className="text-lg text-yellow-600 mb-6">
          Filtra los tests por tema, dificultad y número de preguntas
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
          {/* Menú desplegable de Tema */}
          <select
            value={tema}
            onChange={e => setTema(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-yellow-400 shadow focus:outline-none"
          >
            <option value="">Todos los temas</option>
            {temas.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {/* Menú desplegable de Dificultad */}
          <select
            value={nivel}
            onChange={e => setNivel(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-yellow-400 shadow focus:outline-none"
          >
            <option value="">Todas las dificultades</option>
            {niveles.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          {/* Menú desplegable de Número de preguntas */}
          <select
            value={numPreguntas}
            onChange={e => setNumPreguntas(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-yellow-400 shadow focus:outline-none"
          >
            <option value="">Todas las cantidades</option>
            {preguntasUnicas.map(p => (
              <option key={p} value={p}>{p} preguntas</option>
            ))}
          </select>
        </div>
      </div>

      {/* LISTADO DE TESTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {testsFiltrados.length === 0 && (
          <div className="col-span-2 text-yellow-600 text-center">
            No hay tests con esos filtros.
          </div>
        )}
        {testsFiltrados.map(test => (
          <div
            key={test.id}
            className="rounded-xl border-2 border-yellow-400 bg-white p-8 text-left text-black shadow-lg hover:shadow-yellow-400 transition"
          >
            <h2 className="text-2xl font-bold mb-2">{test.tema}</h2>
            <p className="mb-1">
              Dificultad: <span className="text-yellow-600 font-semibold">{test.nivel}</span>
            </p>
            <p className="mb-4">
              Preguntas: <span className="font-semibold">{test.preguntas}</span>
            </p>
            <button
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 shadow transition"
              onClick={() => router.push(`/test/${test.id}`)}
            >
              Empezar Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
