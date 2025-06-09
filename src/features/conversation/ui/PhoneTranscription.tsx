import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { usePhoneTranscription } from "../model/usePhoneTranscription";

export function PhoneTranscription() {
  const { transcription, loading, loadTranscription } = usePhoneTranscription();

  return (
    <div className="container mx-auto p-8 text-center">
      <Card className="bg-card/50 backdrop-blur-sm border-muted">
        <CardContent className="pt-6">
          <h1 className="text-3xl font-bold mb-4 leading-tight">
            Phone Transcription
          </h1>
          <Button onClick={loadTranscription} disabled={loading}>
            {loading ? "Loading..." : "Load Transcription"}
          </Button>
          {transcription && (
            <ul className="mt-4 text-left list-disc list-inside">
              {transcription.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default PhoneTranscription;
