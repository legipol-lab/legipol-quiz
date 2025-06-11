// src/pages/test/examen.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Answer {
  id: string;
  answer: string;
  correct: "1" | "0";
  ordering: string;
}

interface Question {
  id: string;
  question: string;
  explanation: string;
  type: string;
  category: string;
  answers: Answer[];
}

export default function Examen() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [dudosas, setDudosas] = useState<Set<string>>(new Set());
  const [testFinalizado, setTestFinalizado] = useState(false);
  const [notaReal, setNotaReal] = useState<number | null>(null);
  const [notaConDudosas, setNotaConDudosas] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
  const configRaw = localStorage.getItem("configTest");
  if (!configRaw) {
    alert("No se ha configurado ningún test.");
    window.location.href = "/test/seleccion";
    return;
  }

  const config = JSON.parse(configRaw);
  const temas: string[] = config.temas;
  const totalPreguntas: number = config.totalPreguntas;

  const cargar = async () => {
    try {
      let todas: Question[] = [];

      for (const tema of temas) {
        // Extraer número del tema (ej. "TEMA 02 - ..." → "02")
        const numeroTema = tema.match(/\d+/)?.[0] || "1";
        const nombre = `tema_${numeroTema.padStart(2, "0")}`;
        const res = await fetch(`/data/${nombre}.json`);
        const data = await res.json();
        todas = todas.concat(data);
      }

      const mezcladas = todas.sort(() => 0.5 - Math.random()).slice(0, totalPreguntas);
      setQuestions(mezcladas);
    } catch (error) {
      console.error("Error cargando preguntas:", error);
    }
  };

  cargar();
}, []);


  const handleAnswer = (answerId: string) => {
    setRespuestas({ ...respuestas, [questions[current].id]: answerId });
    setDudosas((prev) => {
      const nuevo = new Set(prev);
      nuevo.delete(questions[current].id);
      return nuevo;
    });
  };

  const marcarDudosa = () => {
    const id = questions[current].id;
    setDudosas((prev) => new Set(prev).add(id));
  };

  const calcularNota = () => {
    const n = 3; // opciones
    const P = questions.length;

    let A_real = 0;
    let E_real = 0;
    let A_dudosa = 0;

    for (const q of questions) {
      const id = q.id;
      const seleccionada = respuestas[id];
      const esDudosa = dudosas.has(id);
      const correcta = q.answers.find((a) => a.correct === "1")?.id;

      if (seleccionada) {
        if (seleccionada === correcta) A_real++;
        else E_real++;
      }

      if (esDudosa) {
        if (!seleccionada && correcta) A_dudosa++;
      }
    }

    const nota1 = ((A_real - E_real / (n - 1)) * 10) / P;
    const nota2 = ((A_real + A_dudosa - E_real / (n - 1)) * 10) / P;

    setNotaReal(Math.max(0, Math.min(10, parseFloat(nota1.toFixed(2)))));
    setNotaConDudosas(Math.max(0, Math.min(10, parseFloat(nota2.toFixed(2)))));

    setTestFinalizado(true);

    const resumen = {
      tema: "Test personalizado",
      fecha: new Date().toISOString(),
      puntuacion: Math.max(0, Math.min(10, parseFloat(nota1.toFixed(2)))),
      total: P,
    };
    const prev = JSON.parse(localStorage.getItem("resultados") || "[]");
    localStorage.setItem("resultados", JSON.stringify([resumen, ...prev]));

    setTimeout(() => {
      router.push("/resultados");
    }, 7000);
  };

  if (questions.length === 0) return <div className="p-6">Cargando preguntas...</div>;

  if (testFinalizado && notaReal !== null && notaConDudosas !== null) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">✅ Test finalizado</h2>
        <p className="mb-2">
          Has contestado <strong>{Object.keys(respuestas).length}</strong> de <strong>{questions.length}</strong> preguntas.
        </p>
        <p className="mb-2">
          Nota real: <strong>{notaReal} / 10</strong>
        </p>
        <p className="mb-4">
          Nota alternativa (contando las dudosas como correctas): <strong>{notaConDudosas} / 10</strong>
        </p>
        <p className="text-sm text-gray-500">Redirigiendo a tu historial en unos segundos...</p>
      </div>
    );
  }

  const pregunta = questions[current];
  const seleccionada = respuestas[pregunta.id];

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Pregunta {current + 1} de {questions.length}
        </h2>
        <button
          onClick={marcarDudosa}
          className="text-sm bg-yellow-300 text-black px-3 py-1 rounded"
        >
          Marcar como dudosa ❓
        </button>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">{pregunta.question}</h3>
        <ul className="space-y-3">
          {pregunta.answers.map((ans) => (
            <li key={ans.id}>
              <button
                onClick={() => handleAnswer(ans.id)}
                className={`w-full text-left px-4 py-3 rounded border
                ${seleccionada === ans.id ?
                  (ans.correct === "1" ? "bg-green-200" : "bg-red-200") :
                  "bg-gray-100 hover:bg-yellow-100"}
              `}
                disabled={!!seleccionada}
              >
                {ans.answer}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          ⬅ Anterior
        </button>

        {current + 1 === questions.length ? (
          <button
            onClick={calcularNota}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Finalizar Test ✅
          </button>
        ) : (
          <button
            onClick={() => setCurrent(current + 1)}
            className="bg-yellow-400 text-black px-4 py-2 rounded"
          >
            Siguiente ➡
          </button>
        )}
      </div>
    </div>
  );
}
