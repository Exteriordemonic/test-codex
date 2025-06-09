import { useState } from "react";

export function usePhoneTranscription() {
  const [transcription, setTranscription] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const loadTranscription = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/phone");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setTranscription(data);
        } else if (data && typeof data === "object") {
          setTranscription(Object.values(data));
        } else {
          setTranscription([]);
        }
      } else {
        console.error("Failed to fetch phone data");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { transcription, loading, loadTranscription };
}
