# Claims Intelligence Engine



https://github.com/user-attachments/assets/d5ff9f94-8197-40a0-b403-35a135c416d3





## Run locally

Use Node.js 20 or newer.

1. Run `npm install`.
2. Copy `server/.env.example` to `server/.env` and add your OpenAI API key.
3. Run `npm run db:setup`.
4. In two terminals, run `npm run dev:server` and `npm run dev:ui`.
5. Open the URL shown by Vite (usually `http://localhost:5173`).

Click **Load fictional sample** for a quick example. A real assessment needs an OpenAI API key. The database is stored locally in `server/prisma/dev.db`.

See [proposal.md](proposal.md) for the process, design choices and next steps.
