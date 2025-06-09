import { serve } from "bun";
import index from "./index.html";
import { fetchQuestions } from "@/api/fetchQuestions";

const server = serve({
  routes: {
    // Serve index.html for all routes
    "/*": index,
    "/api/questions": fetchQuestions,
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);