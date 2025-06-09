import { serve } from "bun";
import index from "./index.html";
import { fetchQuestions } from "@/api/fetchQuestions";
import { fetchPhone } from "@/api/fetchPhone";

const server = serve({
  routes: {
    // Serve index.html for all routes
    "/*": index,
    "/api/questions": fetchQuestions,
    "/api/phone": fetchPhone,
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);