🤖 Agent Task: Conversation Analyzer & Responder
🗂 FSD Compliance
This agent must use Feature-Sliced Design (FSD):

All logic should be modular.

Create a new feature slice under src/features/conversation.

Any shared types or utilities should go under src/shared/.

API calls go under src/api/.

Final submission should be sent via the proper route (/api/phone).

📁 Routing Constraints
Do not touch or modify the index.tsx routing structure. The current server setup is:

ts
Copy
Edit
const server = serve({
  routes: {
    "/*": index,
    "/api/questions": fetchQuestions,
  },
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});
You may add new API routes, but do not change or override the existing /* or /api/questions.