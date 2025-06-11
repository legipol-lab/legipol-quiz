import { useEffect, useState } from "react";

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

export default function TestTema02() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  // ✅ Cargar solo las 5 primeras para pruebas
  useEffect(() => {
    fetch("/data/Tema_02.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data.slice(0, 5)));
  }, []);

  // ✅ Guardar resultado cuando se termina el test
  useEffect(() => {
    if (questions.length > 0 && current >= questions.length) {
      const resumen = {
        tema: questions[0]?.category.split(" - ")[1] || "Tema desconocido",
        fecha: new Date().toISOString(),
        puntuacion: score,
        total: questions.length,
      };

      const prevData = JSON.parse(localStorage.getItem("resultados") || "[]");
      const updated = [resumen, ...prevData];
      localStorage.setItem("resultados", JSON.stringify(updated));
    }
  }, [current, questions, score]);

  if (questions.length === 0) return <p style={{ padding: "1rem" }}>Cargando preguntas...</p>;

  if (current >= questions.length) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>✅ ¡Test finalizado!</h2>
        <p>Has acertado {score} de {questions.length} preguntas.</p>
        <a href="/resultados">
          <button style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
            Ver resultados guardados
          </button>
        </a>
      </div>
    );
  }

  const question = questions[current];

  const handleAnswer = (answerId: string) => {
    if (selected) return;
    setSelected(answerId);
    const isCorrect = question.answers.find((a) => a.id === answerId)?.correct === "1";
    if (isCorrect) setScore((prev) => prev + 1);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowExplanation(false);
    setCurrent((prev) => prev + 1);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>
        Pregunta {current + 1} de {questions.length}
      </h2>
      <h3 style={{ marginBottom: "1.5rem" }}>{question.question}</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {question.answers.map((ans) => (
          <li key={ans.id} style={{ marginBottom: "0.75rem" }}>
            <button
              onClick={() => handleAnswer(ans.id)}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor:
                  selected === ans.id
                    ? ans.correct === "1"
                      ? "lightgreen"
                      : "salmon"
                    : "#e0e0e0",
                cursor: selected ? "default" : "pointer",
              }}
              disabled={!!selected}
            >
              {ans.answer}
            </button>
          </li>
        ))}
      </ul>

      {showExplanation && (
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            backgroundColor: "#f5f5f5",
            borderLeft: "4px solid #1976d2",
          }}
        >
          <strong>Explicación:</strong>
          <p>{question.explanation}</p>
          <button
            onClick={nextQuestion}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Siguiente pregunta
          </button>
        </div>
      )}
    </div>
  );
}
