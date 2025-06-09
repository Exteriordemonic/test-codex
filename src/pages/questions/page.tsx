import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/questions");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setQuestions(data);
        } else if (data && typeof data === "object") {
          setQuestions(Object.values(data));
        } else {
          setQuestions([]);
        }
      } else {
        console.error("Failed to fetch questions");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 text-center">
      <Card className="bg-card/50 backdrop-blur-sm border-muted">
        <CardContent className="pt-6">
          <h1 className="text-3xl font-bold mb-4 leading-tight">Questions</h1>
          <Button onClick={loadQuestions} disabled={loading}>
            {loading ? "Loading..." : "Load Questions"}
          </Button>
          {questions && (
            <ul className="mt-4 text-left list-disc list-inside">
              {questions.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
