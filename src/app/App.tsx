import { Card, CardContent } from "@/shared/ui/card";
import "../index.css";

export function App() {
  return (
    <div className="container mx-auto p-8 text-center">
      <Card className="bg-card/50 backdrop-blur-sm border-muted">
        <CardContent className="pt-6">
          <h1 className="text-5xl font-bold my-4 leading-tight">Blank App</h1>
          <p>Start building your application using Feature-Sliced Design.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
