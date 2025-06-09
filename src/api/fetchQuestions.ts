import { join } from "path";
import { mkdir } from "fs/promises";

const dataDir = join(process.cwd(), "data");
const questionsPath = join(dataDir, "phone_questions.json");

async function fetchQuestions() {
  const cached = Bun.file(questionsPath);
  if (await cached.exists()) {
    const text = await cached.text();
    return new Response(text, {
      headers: { "Content-Type": "application/json" },
    });
  }

  const key = process.env.AI_DEVS_API_KEY;
  const base = process.env.CENTRALA_URL;
  if (!base) {
    return new Response("Base URL not configured", { status: 500 });
  }
  const url = `${base}data/${key}/phone_questions.json`;

  console.log(url);
  const res = await fetch(url);
  if (!res.ok) {
    return new Response("Failed to fetch questions", { status: 500 });
  }
  const text = await res.text();
  await mkdir(dataDir, { recursive: true });
  await Bun.write(questionsPath, text);
  return new Response(text, {
    headers: { "Content-Type": "application/json" },
  });
}

export { fetchQuestions };