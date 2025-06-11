import { useEffect, useState } from "react";

interface Resultado {
  tema: string;
  fecha: string;
  puntuacion: number;
  total: number;
}

export default function Resultados() {
  const [resultados, setResultados] = useState<Resultado[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("resultados") || "[]");
    setResultados(data);
  }, []);

  if (resultados.length === 0) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>📊 Resultados</h2>
        <p>No has realizado ningún test todavía.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2>📊 Resultados guardados</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "0.5rem", borderBottom: "1px solid #ccc" }}>Fecha</th>
            <th style={{ textAlign: "left", padding: "0.5rem", borderBottom: "1px solid #ccc" }}>Tema</th>
            <th style={{ textAlign: "left", padding: "0.5rem", borderBottom: "1px solid #ccc" }}>Puntuación</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((res, i) => (
            <tr key={i}>
              <td style={{ padding: "0.5rem" }}>{new Date(res.fecha).toLocaleString()}</td>
              <td style={{ padding: "0.5rem" }}>{res.tema}</td>
              <td style={{ padding: "0.5rem" }}>
                {res.puntuacion} / {res.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
