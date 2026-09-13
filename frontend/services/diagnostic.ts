export type DiagnosticIssue = {
  id: number;
  title: string;
  description: string;
  symptoms: string[];
  solution: string;
  follow_up_questions: string[];
  confidence: number;
};

export type DiagnosticResponse = {
  query: string[];
  recommendations: DiagnosticIssue[];
};

export async function diagnoseIssue(symptoms: string[]): Promise<DiagnosticResponse> {
  const response = await fetch("http://127.0.0.1:8000/api/diagnostic/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ symptoms }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || "Não foi possível realizar o diagnóstico.");
  }

  return response.json();
}
