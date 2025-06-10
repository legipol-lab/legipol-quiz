/// src/pages/test-firebase.tsx
"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function TestFirebase() {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarPreguntas() {
      try {
        const snapshot = await getDocs(collection(db, "questions"));
        setPreguntas(snapshot.docs.map(doc => doc.data()));
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar preguntas:", err);
        setLoading(false);
      }
    }

    cargarPreguntas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Test de Conexión con Firebase</h1>

      {loading ? (
        <p>Cargando preguntas...</p>
      ) : (
        <>
          {preguntas.length > 0 ? (
            <ul>
              {preguntas.map((p, index) => (
                <li key={index}>
                  <h3>{p.enunciado}</h3>
                  <ul>
                    {p.opciones.map((opcion, i) => (
                      <li key={i}>{opcion}</li>
                    ))}
                  </ul>
                  <p>Correcta: {p.opciones[p.correcta]}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron preguntas.</p>
          )}
        </>
      )}
    </div>
  );
}