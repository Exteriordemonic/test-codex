import { serve } from "bun";
import index from "./index.html";
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
  const base = process.env.XYZ_AGENTS_ORG;
  if (!base) {
    return new Response("Base URL not configured", { status: 500 });
  }
  const url = `${base}data/${key}/phone_questions.json`;
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

const server = serve({
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/api/questions") {
      return fetchQuestions();
    }

    const file = Bun.file(join(".", url.pathname));
    if (await file.exists()) {
      return new Response(file);
    }

    return new Response(Bun.file(index));
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
