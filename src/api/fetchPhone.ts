import { join } from "path";
import { mkdir } from "fs/promises";

const dataDir = join(process.cwd(), "data");
const phonePath = join(dataDir, "phone.json");

async function fetchPhone() {
  const cached = Bun.file(phonePath);
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
  const url = `${base}data/${key}/phone.json`;

  const res = await fetch(url);
  if (!res.ok) {
    return new Response("Failed to fetch phone data", { status: 500 });
  }
  const text = await res.text();
  await mkdir(dataDir, { recursive: true });
  await Bun.write(phonePath, text);
  return new Response(text, {
    headers: { "Content-Type": "application/json" },
  });
}

export { fetchPhone };
