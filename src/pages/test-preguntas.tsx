// src/pages/test-preguntas.tsx
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, db } from "@/lib/firebase";

export default function TestPreguntas() {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPreguntas = async () => {
      try {
        // Cambia "Tema 02. Constitución Española..." por el nombre exacto del tema que usaste al importar
        const q = query(
          collection(db, "questions"),
          where("tema", "==", "Tema 02. Constitución Española...")
        );

        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map((doc) => doc.data());
        setPreguntas(lista);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error al cargar preguntas:", error);
        setLoading(false);
      }
    };

    cargarPreguntas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Test de Preguntas - Tema 02</h1>

      {loading ? (
        <p>Cargando preguntas...</p>
      ) : (
        <>
          <p className="mb-4">Total de preguntas encontradas: <strong>{preguntas.length}</strong></p>

          {preguntas.length === 0 ? (
            <p>No se encontraron preguntas para este tema.</p>
          ) : (
            <ul className="space-y-6">
              {preguntas.map((p, index) => (
                <li key={index} className="bg-white p-4 rounded shadow-md">
                  <h3 className="font-semibold">{p.enunciado}</h3>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    {p.opciones.map((opcion, i) => (
                      <li key={i}>{opcion}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm text-gray-600">
                    Correcta: {p.opciones[p.correcta]}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}